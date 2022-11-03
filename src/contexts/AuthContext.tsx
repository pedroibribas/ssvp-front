import { createContext, useContext, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode
};

const session = localStorage.getItem("ssvpUser");
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