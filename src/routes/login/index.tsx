import LoginForm from "@/components/Login/Form";
import AuthLayout from "@/components/layout/Auth";
import { Text } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  });

  return (
    <AuthLayout>
      <Text style={{ textAlign: "center" }}>Sign in to continue to C-Booking.</Text>
      <LoginForm />
    </AuthLayout>
  );
}
