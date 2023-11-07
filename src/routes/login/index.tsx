import LoginForm from "@/components/Login/Form";
import TextCenter from "@/components/common/TextCenter";
import AuthLayout from "@/components/layout/Auth";
import useTranslation from "@/hooks/useTranslation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const t = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  });

  return (
    <AuthLayout>
      <TextCenter>{t("Sign in to continue to C-Booking")}.</TextCenter>
      <LoginForm />
    </AuthLayout>
  );
}
