import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getKeycloakLoginUrl } from "../../store/auth/authApi";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      const loginUrl = getKeycloakLoginUrl();
      // Redirect to Keycloak login page if no token is found
      window.location.href = loginUrl;
      return;
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
