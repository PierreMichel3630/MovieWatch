import {
  AuthError,
  AuthTokenResponse,
  User,
  UserResponse,
} from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import {
  passwordReset,
  signInWithEmail,
  signOut,
  supabase,
  updatePassword,
} from "src/api/supabase";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const AuthContext = createContext<{
  user: User | null;
  login: (email: string, password: string) => Promise<AuthTokenResponse>;
  logout: () => Promise<{ error: AuthError | null }>;
  passwordReset: (
    email: string
  ) => Promise<{ data: {}; error: null } | { data: null; error: AuthError }>;
  updatePassword: (password: string) => Promise<UserResponse>;
}>({
  user:
    localStorage.getItem("user") !== null
      ? (JSON.parse(localStorage.getItem("user")!) as User)
      : null,
  login: (email: string, password: string) => signInWithEmail(email, password),
  logout: () => signOut(),
  passwordReset: (email: string) => passwordReset(email),
  updatePassword: (password: string) => updatePassword(password),
});

export const useAuth = () => useContext(AuthContext);

const login = (email: string, password: string) =>
  signInWithEmail(email, password);

const logout = () => signOut();

export const AuthProviderSupabase = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(
    localStorage.getItem("user") !== null
      ? (JSON.parse(localStorage.getItem("user")!) as User)
      : null
  );
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        setAuth(false);
      } else if (event === "SIGNED_IN") {
        setUser(session !== null ? session.user : null);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, passwordReset, updatePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
