import { createContext, useEffect, useState } from "react";
import axios from "axios";

type loginInfo = {
  email:string,
  username:string,
  password:string
  };
type contextInfo = {currentUser: loginInfo, login: (inputs: loginInfo) => Promise<void>}

export const AuthContext = createContext<contextInfo | null >(null);

export const AuthContextProvider = ({ children }:React.PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<loginInfo>(
    JSON.parse(localStorage.getItem("user") ?? "{}") || null
  );
  // localStorange.getItem("user") ? localStorage.getItem("user") : "{}"

  const login = async (inputs:loginInfo) => {
    const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
      withCredentials:true,
    });

    setCurrentUser(res.data)
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
