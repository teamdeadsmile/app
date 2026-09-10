import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [twoFactor, setTwoFactor] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const me = await api.get("/auth/me");

      setUser(me);
      setTwoFactor(false);
      setStatus("authenticated");

      return me;
    } catch {
      setUser(null);
      setTwoFactor(false);
      setStatus("guest");

      return null;
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  /*
   * Login uses only email and password.
   * No reCAPTCHA token is sent to the backend.
   */
  const login = useCallback(async (email, password) => {
    const result = await api.post("/auth/mobile-login", {
      email,
      password,
    });

    /*
     * The backend requires two-factor authentication.
     */
    if (result?.requiresTwoFactor) {
      setUser(null);
      setTwoFactor(true);
      setStatus("two-factor");

      return result;
    }

    /*
     * Normal authenticated session.
     */
    setTwoFactor(false);
    setUser(result);
    setStatus("authenticated");

    return result;
  }, []);

  /*
   * Complete two-factor authentication.
   */
  const verifyTwoFactor = useCallback(async (token) => {
    const me = await api.post("/auth/verify-2fa", {
      token,
    });

    setTwoFactor(false);
    setUser(me);
    setStatus("authenticated");

    return me;
  }, []);

  /*
   * Register a new account.
   */
  const register = useCallback(async (payload) => {
    const me = await api.post("/auth/mobile-register", payload);

    setUser(me);
    setTwoFactor(false);
    setStatus("authenticated");

    return me;
  }, []);

  /*
   * End the current session.
   */
  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
      setTwoFactor(false);
      setStatus("guest");
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      status,
      twoFactor,
      login,
      verifyTwoFactor,
      register,
      logout,
      refresh,
    }),
    [
      user,
      status,
      twoFactor,
      login,
      verifyTwoFactor,
      register,
      logout,
      refresh,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);