import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { environment } from "../../environment";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      const loginUrl = `${environment.keycloakAuthUrl}?client_id=${environment.keycloakClientId}&redirect_uri=${environment.keycloakRedirectUri}&response_type=code`;
      navigate(`/keycloak-auth?returnUrl=${encodeURIComponent(loginUrl)}`, {
        replace: true,
      });
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
