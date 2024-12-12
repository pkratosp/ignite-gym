import { createContext, ReactNode, useEffect, useState } from "react";
import { UserDto } from "../dto/UserDto";
import { api } from "../lib/axios";
import { storageSession, storageUser } from "@storage/storageUser";

export interface AuthContextProps {
  user: UserDto;
  signIn: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

interface Props {
  children: ReactNode;
}

export function AuthContextProvider({ children }: Props) {
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
    const session = await storageSession();

    if (session) {
      setUser(session);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
