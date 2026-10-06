import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { APP_NAME } from "@/lib/constants";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <Link href="/" className="mb-6 font-semibold">
        {APP_NAME}
      </Link>
      <RegisterForm />
    </div>
  );
}
