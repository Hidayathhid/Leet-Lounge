import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Auth user type
interface AuthUser {
  id: number;
  username: string;
}

// Auth context type
type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  loginMutation: UseMutationResult<any, Error, LoginData>;
  logoutMutation: UseMutationResult<any, Error, void>;
  registerMutation: UseMutationResult<any, Error, RegisterData>;
};

// Login data type
type LoginData = {
  username: string;
  password: string;
};

// Register data type
type RegisterData = {
  username: string;
  password: string;
};

// Create auth context
export const AuthContext = createContext<AuthContextType | null>(null);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Query for getting the current user's authentication status
  const {
    data: authData,
    error,
    isLoading,
    refetch: refetchAuth,
  } = useQuery({
    queryKey: ["/api/auth/status"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/auth/status");
      return res;
    },
    retry: false,
  });

  // Set authentication status when authData changes
  useEffect(() => {
    if (authData) {
      setIsAuthenticated(authData.authenticated || false);
    }
  }, [authData]);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/auth/login", {
        body: JSON.stringify(credentials)
      });
      return res;
    },
    onSuccess: (data) => {
      if (data.success) {
        setIsAuthenticated(true);
        queryClient.invalidateQueries({ queryKey: ["/api/auth/status"] });
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
          variant: "default",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterData) => {
      const res = await apiRequest("POST", "/api/auth/register", {
        body: JSON.stringify(userData)
      });
      return res;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Registration successful",
          description: "You can now log in with your credentials",
          variant: "default",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message || "Username may already be taken",
        variant: "destructive",
      });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/auth/logout");
      return res;
    },
    onSuccess: () => {
      setIsAuthenticated(false);
      queryClient.invalidateQueries({ queryKey: ["/api/auth/status"] });
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: authData?.authenticated ? authData.user : null,
        isLoading,
        error,
        isAuthenticated,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}