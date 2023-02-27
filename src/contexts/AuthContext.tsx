import { createContext, useContext, useEffect, useState } from "react";
import { AuthApi } from "../api/Dashboard/authApi";
import { getLocalStorageUserKey } from "../utils/getLocalStorageUserKey";

interface IAuthContext {
  user: User | null
  login: (user: LoginRequest) => Promise<User>
  logout: () => void
  hasAuth: () => boolean
}
type User = {
  username?: string
  token?: string
}

interface AuthProviderProps {
  children: React.ReactNode
}

interface LoginRequest {
  username: string
  password: string
}

const INITIAL_STATE = {};

export const AuthContext = createContext<IAuthContext>(INITIAL_STATE as IAuthContext);

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState(INITIAL_STATE as User);

  useEffect(() => {
    const storageData = localStorage.getItem(getLocalStorageUserKey());
    const initialUser = storageData ? JSON.parse(storageData) : null;
    setUser(initialUser);
  }, [])

  const login = (user: LoginRequest) => {
    return AuthApi.login(user)
      .then((res) => {
        localStorage.setItem(getLocalStorageUserKey(), JSON.stringify(res.data));
        setUser(res.data);
        return res.data;
      })
      .catch(err => console.log(err));
  }

  const logout = () => {
    localStorage.removeItem(getLocalStorageUserKey());
    setUser(INITIAL_STATE);
  }

  const hasAuth = () => user?.token ? true : false;

  return (
    <AuthContext.Provider value={{ user, login, logout, hasAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)