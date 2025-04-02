import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {Link} from "react-router";
import {Eye, EyeOff, Loader2} from "lucide-react";
import {useMutation} from "@tanstack/react-query";
import {AnimatePresence, motion} from "framer-motion";

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
import {signInMutationFn} from "../../hooks/use-auth";
import {SignInSchema} from "../../schemas/auth-schemas";
import {ROUTES} from "@/routes/routes-paths";

export function SignInForm({className, ...props}: React.ComponentPropsWithoutRef<"div">) {
  // Animation variants for the eye icon toggle
  const iconVariants = {
    hidden: {opacity: 0, scale: 0.8},
    visible: {opacity: 1, scale: 1, transition: {duration: 0.2, ease: "easeInOut"}},
    exit: {opacity: 0, scale: 0.8, transition: {duration: 0.2, ease: "easeInOut"}},
  };

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
          <CardTitle className="text-2xl font-semibold tracking-tight not-dark:text-gray-900">
            Sign In
          </CardTitle>
          <CardDescription className="not-dark:text-gray-600">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-4">
          {/* OAuth SignIn Buttons */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <OAuthButton
              label="Google"
              provider="google"
              icon={FcGoogle}
              redirectURL={`${BaseUrl}/auth/google`}
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2"
              aria-label="Sign in with Google"
            />
            <OAuthButton
              label="GitHub"
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
            <span className="bg-background text-muted-foreground relative z-10 px-2 not-dark:text-gray-500">
              or
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
                          <AnimatePresence mode="popLayout">
                            {showPassword ? (
                              <motion.div
                                key="eye-off"
                                variants={iconVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit">
                                <EyeOff className="text-muted-foreground size-[18px]" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="eye"
                                variants={iconVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit">
                                <Eye className="text-muted-foreground size-[18px]" />
                              </motion.div>
                            )}
                          </AnimatePresence>
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
                className={cn("mt-2 w-full", "flex items-center justify-center gap-2")}
                size="lg"
                disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="mx-auto -mt-3">
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to={ROUTES.SIGN_UP}
              className="text-primary font-medium hover:underline hover:underline-offset-4">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
