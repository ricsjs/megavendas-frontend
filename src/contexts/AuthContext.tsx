import { api } from "@/services/api";
import { destroyCookie, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

interface SignInCredentials {
  email: string;
  password: string;
}

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User | null;
  isAuthenticated: boolean;
  signOut: () => void;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("@megavendas-user");
    if (loggedInUser) {
      const { userId, token } = JSON.parse(loggedInUser);
      setUser(userId);
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      router.push("/dashboard");
    } else {
      setUser(null);
    }
  }, [router]);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post(`auth/login`, {
        email,
        password,
      });

      const { token, userId } = response.data;
      console.log(userId)

      localStorage.setItem("@megavendas-user", JSON.stringify({ userId, token }));
      setCookie(undefined, "megaAuth.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      setUser(userId);

      router.push("/dashboard");
    } catch (err) {
      setUser(null);
      console.error(err);
    }
  }

  function signOut() {
    destroyCookie(undefined, "megaAuth.token");
    localStorage.removeItem("@megavendas-user");
    setUser(null);
    router.push("/");
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isAuthenticated,
        user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
