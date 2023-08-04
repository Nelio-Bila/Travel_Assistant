import React, { useState, createContext, useEffect } from "react";
import { login,signup, recoverUserInformation } from "@/services/UserService";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import {api} from "@/config/api";

type User = {
  id: string;

  email: string;
  type: "NORMAL"|"ADMIN"|"SUPER",
  hasWorkerProfile: boolean
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signOut: ()=>void
};

type SignInData = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { tendera_token: token } = parseCookies();

    if (token) {
      recoverUserInformation(token).then((response) => {
        setUser(response.user);
      });
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await login({ email, password });

    setCookie(undefined, "tendera_token", token, { maxAge: 60 * 60 * 1 });

    api.defaults.headers.common["Authorization"] =
    "Bearer " + token;

    setUser(user);

    Router.push("/");
  }

  async function signOut() {
    destroyCookie(undefined, 'tendera_token', {
        maxAge: -1,
      });

    api.defaults.headers.common["Authorization"] =
    "Bearer ";

    setUser(null);

    Router.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn,signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
