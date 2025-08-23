import { ref, computed } from "vue";
import type { AuthData } from "./lib/type";
import $api from "@/plugins/axios";

// Global authentication state
const authData = ref<AuthData | null>(null);
const isAuthenticated = computed(() => !!authData.value?.token);

// Initialize authentication state from localStorage
const initializeAuth = () => {
  const storedAuth = localStorage.getItem("auth_data");
  if (storedAuth) {
    try {
      const parsed = JSON.parse(storedAuth) as AuthData;
      // Check if token is expired
      const now = Date.now();
      const tokenExpiry = parsed.lifetime;

      if (tokenExpiry && now < tokenExpiry) {
        authData.value = parsed;
      } else {
        // Token expired, clear it
        clearAuth();
      }
    } catch (error) {
      console.error("Error parsing auth data:", error);
      clearAuth();
    }
  }
};

// Clear authentication data
const clearAuth = () => {
  authData.value = null;
  localStorage.removeItem("auth_data");
};

// Set authentication data
const setAuth = (data: AuthData) => {
  authData.value = data;
  localStorage.setItem("auth_data", JSON.stringify(data));
};

// Logout function
const logout = async () => {
  try {
    if (authData.value?.userEmail) {
      // Call logout API with user email
      await $api.post("/auth/logout", { email: authData.value.userEmail });
    }
  } catch (error) {
    console.error("Logout API call failed:", error);
    // Continue with local logout even if API call fails
  } finally {
    // Always clear local auth data
    clearAuth();
    // Redirect to login page
    window.location.href = "/dang-nhap";
  }
};

// Check if token is expired
const isTokenExpired = () => {
  if (!authData.value?.lifetime) return true;
  return Date.now() >= authData.value.lifetime;
};

// Auto logout when token expires
const checkTokenExpiration = () => {
  if (isAuthenticated.value && isTokenExpired()) {
    console.log("Token expired, logging out...");
    logout();
  }
};

// Export composable
export const useAuth = () => {
  return {
    authData: computed(() => authData.value),
    isAuthenticated,
    initializeAuth,
    setAuth,
    clearAuth,
    logout,
    isTokenExpired,
    checkTokenExpiration,
  };
};
