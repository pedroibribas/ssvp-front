import { createContext, useContext, useState } from "react";

// Provider State
// interface IUser {
//   user: {
//     username: string;
//     token: string;
//   }
// };

// Provider Store
// interface IAuthContext {
//   user: IUser;
//   setUser: (user: IUser) => void;
// };

interface AuthProviderProps {
  children: React.ReactNode
};

const session = localStorage.getItem("user");
const initialUser = session ? JSON.parse(session) : null;

export const AuthContext = createContext(initialUser);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(initialUser);

  return (
    <AuthContext.Provider value={{
      user,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};