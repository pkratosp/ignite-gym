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
  });

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post("/sessions", { email, password });

      if (response.data.user) {
        setUser(response.data.user);
        storageUser(response.data.user);
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

  useEffect(() => {
    userLogged();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        isLoadingUserStorage,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
