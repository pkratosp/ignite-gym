import { AuthContext } from "@contexts/AuthContext";
import { useContext } from "react";

export function useAuth() {
    const session = useContext(AuthContext)

    return session
}