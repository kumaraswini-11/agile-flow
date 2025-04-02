import {SignUpForm} from "@/components/auth/sign-up";
import AuthLayout from "@/layouts/auth-layout";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}
