import type { Metadata } from "next";
import { LoginPage } from "@/components/auth/login-page";

export const metadata: Metadata = {
  title: "Login - PashuGyan",
  description:
    "Sign in to PashuGyan with Supabase to sync breed detections and farmer dashboard history.",
};

export default function SignInPage() {
  return <LoginPage />;
}
