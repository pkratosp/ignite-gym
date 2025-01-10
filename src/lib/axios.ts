import { storageSession, storageUser } from "@storage/storageUser";
import { AppError } from "@utils/AppError";
import axios, { AxiosError, AxiosInstance } from "axios";

type SingOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerIntercepTokenMenager: (singOut: SingOut) => () => void;
};

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

const api = axios.create({
  baseURL: "http://192.168.18.107:3333",
}) as APIInstanceProps;

let failedQueue: Array<PromiseType> = [];
let isRefresh = false;

// api.registerIntercepTokenMenager = (singOut) => {
//   const interceptTokenManager = api.interceptors.response.use(
//     (response) => response,
//     async (requestError) => {
//       if (requestError.response?.status === 401) {
//         if (
//           requestError.response.data?.message === "token.expired" ||
//           requestError.response.data?.message === "token.invalid"
//         ) {
//           const { refresh_token, ...session } = await storageSession();

//           if (!refresh_token) {
//             console.warn("saindo...");
//             singOut();
//             return Promise.reject(requestError);
//           }

//           const originalRequestConfig = requestError.config;

//           if (isRefresh) {
//             return new Promise((resolve, reject) => {
//               failedQueue.push({
//                 onSuccess: (token: string) => {
//                   originalRequestConfig.headers = {
//                     Authorization: `Bearer ${token}`,
//                   };
//                   resolve(api(originalRequestConfig));
//                 },
//                 onFailure: (error: AxiosError) => {
//                   reject(error);
//                 },
//               });
//             });
//           }

//           isRefresh = true;

//           return new Promise(async (resolve, reject) => {
//             try {
//               const { data } = await api.post("/sessions/refresh-token", {
//                 token: refresh_token,
//               });

//               await storageUser({
//                 ...session,
//                 refresh_token: data.refresh_token,
//                 token: data.token,
//               });

//               console.log("aqui");
//               console.log(data);
//             } catch (error: any) {
//               failedQueue.forEach((request) => {
//                 request.onFailure(error);
//               });

//               singOut();
//               reject(error);
//             } finally {
//               isRefresh = false;
//               failedQueue = [];
//             }
//           });
//         }
//         singOut();
//       }

//       if (requestError.response && requestError.response.data) {
//         return Promise.reject(new AppError(requestError.response.data.message));
//       } else {
//         return Promise.reject(requestError);
//       }
//     }
//   );

//   return () => {
//     api.interceptors.response.eject(interceptTokenManager);
//   };
// };

api.registerIntercepTokenMenager = (singOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError.response?.status === 401) {
        if (
          requestError.response.data?.message === "token.expired" ||
          requestError.response.data?.message === "token.invalid"
        ) {
          const { refresh_token, ...session } = await storageSession();

          if (!refresh_token) {
            singOut();
            return Promise.reject(requestError);
          }

          const originalRequestConfig = requestError.config;

          if (isRefresh) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`,
                  };
                  resolve(api(originalRequestConfig));
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                },
              });
            });
          }

          isRefresh = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post("/sessions/refresh-token", {
                refresh_token,
              });

              // console.log(data);

              await storageUser({
                ...session,
                refresh_token: data.refresh_token,
                token: data.token,
              });

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data
                );
              }

              originalRequestConfig.headers = {
                Authorization: `Bearer ${data.token}`,
              };
              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${data.token}`;

              failedQueue.forEach((request) => {
                request.onSuccess(data.token);
              });

              console.log("token autorizado");

              resolve(api(originalRequestConfig));
            } catch (error: any) {
              failedQueue.forEach((request) => {
                request.onFailure(error);
              });
              singOut();
              reject(error);
            } finally {
              isRefresh = false;
              failedQueue = [];
            }
          });
        }

        singOut();
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        return Promise.reject(requestError);
      }
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };
