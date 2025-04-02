import {Link} from "react-router";

import {ROUTES} from "@/routes/routes-paths";
import {ForgotPasswordForm} from "@/components/auth/forgot-password";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img
            src="/logo.svg"
            alt="Workspace"
            width={40}
            height={40}
            className="h-12 w-auto"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to Agile Flow
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Reset your password</h1>
              <p className="mt-1 text-sm text-gray-500">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </div>

            <ForgotPasswordForm />

            <div className="text-center text-sm">
              <p className="text-gray-500">
                Remember your password?{" "}
                <Link
                  to={ROUTES.SIGN_IN}
                  className="text-primary hover:text-primary/80 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
