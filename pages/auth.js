import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthForm from "../components/auth/auth-form";

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/profile");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return <AuthForm />;
}

export default AuthPage;
