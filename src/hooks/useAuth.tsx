// src/hooks/useAuth.ts
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// This User interface should match the user object structure returned by your backend API
interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin"; // Backend still sends this, but we might ignore it for isAdmin flag
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean; // This will be true for any logged-in user
  setAuthState: (userData: User, token: string) => void;
  clearAuthState: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // This will be forced to true on login

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken && storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        if (parsedUser && parsedUser.id && parsedUser.email) {
          // Role check less critical here if we force isAdmin
          setUser(parsedUser);
          setToken(storedToken);
          setIsAuthenticated(true);
          // Forcing isAdmin to true if there's a stored session, mimicking the desired login behavior
          // This means if they were previously logged in (even as a normal user by backend standards),
          // they'll see the admin panel on refresh.
          // If you ONLY want this for NEW logins, then this line should be more nuanced
          // or removed, and only set in setAuthState.
          // For now, to match "login karte hi admin panel show", we'll set it here too.
          setIsAdmin(true); // Or, more consistently: setIsAdmin(parsedUser.isLoggedInAsAdminForUI || false);
          // And save this 'isLoggedInAsAdminForUI' flag in localStorage
          console.log(
            "Auth state loaded. User:",
            parsedUser.email,
            "Forcing isAdmin UI: true"
          );
        } else {
          throw new Error("Malformed user data in localStorage");
        }
      } catch (error) {
        console.error("Failed to parse stored auth data:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
      }
    }
  }, []);

  const setAuthState = (userData: User, jwtToken: string) => {
    const sessionDataForStorage = {
      ...userData,
      // You could add a flag here if you want to differentiate behavior on refresh
      // isLoggedInAsAdminForUI: true
    };

    localStorage.setItem("authToken", jwtToken);
    localStorage.setItem("authUser", JSON.stringify(sessionDataForStorage)); // Store the full user object

    setUser(userData); // Store the actual user data from backend
    setToken(jwtToken);
    setIsAuthenticated(true);

    // --- KEY MODIFICATION ---
    // Regardless of userData.role, set isAdmin to true for UI purposes if login was successful
    setIsAdmin(true);
    console.log(
      `Auth state set. User: ${userData.email}. Forcing isAdmin UI to: true (Backend role: ${userData.role})`
    );
  };

  const clearAuthState = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setIsAdmin(false); // Reset isAdmin on logout
    console.log("Auth state cleared (logout).");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin, // This will now be true for any user who successfully logs in via backend
        setAuthState,
        clearAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
