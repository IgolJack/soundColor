import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { SmileTwoTone } from "@ant-design/icons";
import { Spin } from "antd";

export const AuthContext = React.createContext();
const antIcon = <SmileTwoTone style={{ fontSize: 50 }} spin />;

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: "0",
          left: "0",
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          overflow: "auto",
        }}
      >
        <div>
          <Spin indicator={antIcon} />
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
