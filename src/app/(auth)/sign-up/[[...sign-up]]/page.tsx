import type { Metadata } from "next";
import { RegisterPage } from "@/components/auth/register-page";

export const metadata: Metadata = {
  title: "Sign Up | PashuGyan AI",
  description:
    "Create a PashuGyan farmer account to keep breed detection history unique for every farm.",
};

export default function SignUpPage() {
  return <RegisterPage />;
}
