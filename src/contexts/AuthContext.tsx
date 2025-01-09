import { createContext, ReactNode, useEffect, useState } from "react";
import { UserDto } from "../dto/UserDto";
import { api } from "../lib/axios";
import {
  removeSession,
  storageSession,
  storageUser,
} from "@storage/storageUser";

export interface AuthContextProps {
  user: UserDto;
  updatedDataProfile: (user: UserDto) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  isLoadingUserStorage: boolean;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

interface Props {
  children: ReactNode;
}

export function AuthContextProvider({ children }: Props) {
  const [isLoadingUserStorage, setIsLoadingUserStorage] =
    useState<boolean>(false);
  const [user, setUser] = useState<UserDto>({
    avatar: "",
    email: "",
    id: "",
    name: "",
    token: "",
    refresh_token: "",
  });

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post("/sessions", { email, password });

      if (response.data.user) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        setUser(response.data.user);
        storageUser({
          ...response.data.user,
          token: response.data.token,
          refresh_token: response.data.refresh_token,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async function userLogged() {
    try {
      const session = await storageSession();

      if (session) {
        setUser(session);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorage(true);

      await removeSession();

      setUser({} as UserDto);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function updatedDataProfile(user: UserDto) {
    setUser(user);
    await storageUser(user);
  }

  useEffect(() => {
    userLogged();
  }, []);

  useEffect(() => {
    const subscribe = api.registerIntercepTokenMenager(signOut);

    return () => {
      subscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        updatedDataProfile,
        signIn,
        isLoadingUserStorage,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
