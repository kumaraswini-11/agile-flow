import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {Link} from "react-router";
import {Eye, EyeOff} from "lucide-react";
import {useMutation} from "@tanstack/react-query";

import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {cn} from "@/lib/utils";
import {OAuthButton} from "./oauth-button";
import {BaseUrl} from "@/constants";
import {signInMutationFn} from "./use-auth";
import {SignInSchema} from "./auth-schemas";

export function SignInForm({className, ...props}: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  const signInForm = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {mutate, isPending} = useMutation({
    mutationFn: signInMutationFn,
  });

  const onSubmit = (values: z.infer<typeof SignInSchema>) => {
    if (isPending) return; // Guard against double submission

    mutate(values); // Call the mutate function from useSignInMutation
  };

  return (
    <div
      className={cn("flex w-full max-w-md flex-col gap-6", className)}
      {...props}>
      <Card className="shadow-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">Welcome back</CardTitle>
          <CardDescription>Signin with your Google or GitHub account</CardDescription>
        </CardHeader>

        <CardContent className="pb-4">
          {/* OAuth Sign In */}
          <div className="flex flex-col gap-4">
            <OAuthButton
              label="Sign in"
              provider="google"
              icon={FcGoogle}
              redirectURL={`${BaseUrl}/auth/google`}
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2"
              aria-label="Sign in with Google"
            />
            <OAuthButton
              label="Sign in"
              provider="github"
              icon={FaGithub}
              redirectURL={`${BaseUrl}/auth/github`}
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2"
              aria-label="Sign in with GitHub"
            />
          </div>

          {/* Separator */}
          <div className="after:border-border relative my-4 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>

          {/* Form */}
          <Form {...signInForm}>
            <form
              onSubmit={signInForm.handleSubmit(onSubmit)}
              className="grid gap-4">
              {/* Email */}
              <FormField
                name="email"
                control={signInForm.control}
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="example@gmail.com"
                        disabled={isPending}
                        aria-label="Email"
                        autoComplete="email"
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Passsword */}
              <FormField
                name="password"
                control={signInForm.control}
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          disabled={isPending}
                          aria-label="Password"
                          autoComplete="current-password"
                          className="h-10 pr-10"
                        />
                        <Button
                          type="button"
                          variant="link"
                          size="sm"
                          className="absolute top-0 right-0 h-10 w-10 px-3"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}>
                          {showPassword ? (
                            <EyeOff className="text-muted-foreground h-4 w-4" />
                          ) : (
                            <Eye className="text-muted-foreground h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>

                    {/* Forgot password */}
                    <div className="flex justify-end">
                      <Link
                        to="/forgot-password"
                        className="text-primary text-xs font-medium hover:underline hover:underline-offset-4">
                        Forgot password?
                      </Link>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-2 w-full"
                size="lg"
                disabled={isPending}>
                {isPending ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="mx-auto -mt-3">
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-medium hover:underline hover:underline-offset-4">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
