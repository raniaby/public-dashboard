import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLoginWithCodeMutation } from "../../store/auth/authApi";

const KeycloakAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loginWithCode, { isLoading }] = useLoginWithCodeMutation();
  const hasExchanged = useRef(false);

  const code = searchParams.get("code");
  const returnUrl = searchParams.get("returnUrl");

  useEffect(() => {
    if (!code && returnUrl) {
      window.location.href = returnUrl;
      return;
    }

    if (code && !hasExchanged.current) {
      hasExchanged.current = true;
      loginWithCode({ code })
        .unwrap()
        .then((response) => {
          localStorage.setItem("access_token", response.access_token);
          localStorage.setItem("refresh_token", response.refresh_token);
          navigate("/", { replace: true });
        })
        .catch((error) => {
          console.error("Login failed:", error);
          navigate("/", { replace: true });
        });
    }
  }, [code, loginWithCode, navigate, returnUrl]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return null;
};

export default KeycloakAuth;
