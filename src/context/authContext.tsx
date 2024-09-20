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
    JSON.parse(localStorage.getItem("user")!) || null
  );

  // SERVER AXIOS CONNECTION
  const login = async (inputs: loginInfo) => {
    const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data);
  };

  // const login = () => {
  //   // temp login function 
  //   setCurrentUser({
  //     id: 1,
  //     name: "Jo Doe",
  //     profile_picture: "https://t4.ftcdn.net/jpg/03/64/21/11/240_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
  //   });
  // }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
