import { createContext, useEffect, useState } from "react";
// import { getCurrentUser } from "@/services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [partner, setPartner] = useState("");

  useEffect(() => {
  // load partner on app start
  const savedPartner = localStorage.getItem("partner");
  if (savedPartner) {
    setPartner(JSON.parse(savedPartner));
  }
}, []);

useEffect(() => {
  if (partner) {
    localStorage.setItem("partner", JSON.stringify(partner));
  }
}, [partner]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        setUser,
        partner,
        setPartner,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
