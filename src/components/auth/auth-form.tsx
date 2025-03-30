import {AppLogo} from "../logo";
import {SignInForm} from "./sign-in";
import {SignUpForm} from "./sign-up";

interface AuthFormProps {
  formType: "signin" | "signup";
}

export const AuthForm: React.FC<AuthFormProps> = ({formType}) => {
  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {/* AppLogo Component for branding */}
        <AppLogo className="flex items-center gap-2 self-center font-medium" />

        {/* Conditional rendering of SignInForm or SignUpForm */}
        {formType === "signin" ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
};
