import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUserFromToken = (token) => {
    if (token) {
      return jwtDecode(token);
    }
    return null;
  };

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("https://fdcl5f-8000.csb.app/auth/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    setIsLoading(false);
    if (response.ok) {
      const user = getUserFromToken(data.access);
      setUser(user);
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      setError("logged in");
      console.log(user);
    } else {
      // Handle errors
      console.log(data);
      setError("Invalid Credentials");
    }
  };

  const logout = async () => {
    // Implement logout logic using fetch API
    setIsLoading(true);
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setIsLoading(false);
    setError("logged out");
  };

  useEffect(() => {
    const refreshInterval = setInterval(
      async () => {
        if (refreshToken) {
          try {
            const response = await fetch(
              "https://fdcl5f-8000.csb.app/auth/token/refresh/",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: refreshToken }),
              },
            );
            const data = await response.json();
            if (response.ok) {
              setAccessToken(data.access);
              setRefreshToken(data.refresh);
              console.log("Token refreshed");
            } else {
              // Handle refresh errors
              logout();
            }
          } catch (error) {
            console.error(error);
            logout();
          }
        }
      },
      3 * 60 * 1000,
    ); // 3 minutes

    return () => clearInterval(refreshInterval);
  }, [refreshToken]);

  return (
    <authContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        login,
        logout,
        isLoading,
        color: "blue",
        error,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default authContext;
