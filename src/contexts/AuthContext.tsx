import { createContext, useContext, useState } from "react";
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

const storageData = localStorage.getItem(getLocalStorageUserKey());
const initialUser = storageData ? JSON.parse(storageData) : null;
const initialContext = { user: initialUser };
export const AuthContext = createContext<IAuthContext>(initialContext as IAuthContext);

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState(initialContext.user as User);

  const login = (user: LoginRequest) => {
    return AuthApi.login(user)
      .then((res) => {
        localStorage.setItem(getLocalStorageUserKey(), JSON.stringify(res.data));
        setUser(res.data);
        return res.data;
      })
      .catch(err => console.log(`AuthContext:40 - ${err.response.data}`));
  }

  const logout = () => {
    localStorage.removeItem(getLocalStorageUserKey());
    setUser({});
  }

  const hasAuth = () => user?.token ? true : false;

  return (
    <AuthContext.Provider value={{ user, login, logout, hasAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)