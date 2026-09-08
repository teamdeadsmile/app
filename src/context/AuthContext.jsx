import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); const [status, setStatus] = useState('loading');
  const refresh = useCallback(async () => { try { const me = await api.get('/auth/me'); setUser(me); setStatus('authenticated'); return me; } catch { setUser(null); setStatus('guest'); return null; } }, []);
  useEffect(() => { refresh(); }, [refresh]);
  const login = useCallback(async (email, password) => { const me = await api.post('/auth/login', { email, password }); setUser(me); setStatus('authenticated'); return me; }, []);
  const register = useCallback(async (payload) => { const me = await api.post('/auth/register', payload); setUser(me); setStatus('authenticated'); return me; }, []);
  const logout = useCallback(async () => { try { await api.post('/auth/logout'); } finally { setUser(null); setStatus('guest'); } }, []);
  const value = useMemo(() => ({ user, status, login, register, logout, refresh }), [user,status,login,register,logout,refresh]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
