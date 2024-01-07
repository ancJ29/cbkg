import LoginForm from "@/components/Login/Form";
import TextCenter from "@/components/common/TextCenter";
import AuthLayout from "@/components/layout/Auth";
import useTranslation from "@/hooks/useTranslation";
import useAuthStore from "@/stores/auth.store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const t = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    user && navigate("/dashboard");
  }, [navigate, user]);

  return (
    <AuthLayout>
      <TextCenter>
        {t("Sign in to continue to C-Booking")}.
      </TextCenter>
      <LoginForm />
    </AuthLayout>
  );
}
