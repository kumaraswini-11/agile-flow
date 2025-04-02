import {SignInForm} from "@/components/auth/sign-in";
import AuthLayout from "@/layouts/auth-layout";

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
}
