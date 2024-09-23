import { createContext, useEffect, useState } from "react";
import axios from "axios";

type loginInfo = {
  user_id?: number,
  name?: string,
  username: string,
  email: string,
  password: string,
  profile_picture?: string
};


type contextInfo = { currentUser: loginInfo, login: (inputs: loginInfo) => Promise<void> }

export const AuthContext = createContext<contextInfo | null>(null);

export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<loginInfo>(
    JSON.parse(sessionStorage.getItem("user")!) || null
  );

  // SERVER AXIOS CONNECTION
  const login = async (inputs: loginInfo) => {
    const res = await axios.post("https://microblog-api-l3mq.onrender.com/api/auth/login", inputs, {
      withCredentials: true,
    });
    // const login = async (inputs: loginInfo) => {
    //   const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
    //     withCredentials: true,
    //   });

    setCurrentUser(res.data);
  };

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
