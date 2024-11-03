import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase"; // your Firebase setup file
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Listen for authentication status changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth).catch((error) => console.error("Logout failed:", error));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
