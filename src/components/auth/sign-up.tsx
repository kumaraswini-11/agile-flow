import {Link} from "react-router";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useMutation} from "@tanstack/react-query";
import {FaGithub} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {Loader2, Lock, Mail, User} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {signUpMutationFn} from "../../hooks/use-auth";
import {cn} from "@/lib/utils";
import {signUpSchema} from "../../schemas/auth-schemas";
import {BaseUrl} from "@/constants";
import {OAuthButton} from "./oauth-button";
import {ROUTES} from "@/routes/routes-paths";

export function SignUpForm({className, ...props}: React.ComponentPropsWithoutRef<"div">) {
  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {mutate, isPending} = useMutation({
    mutationFn: signUpMutationFn,
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    if (isPending) return; // Guard against double submission

    mutate(values);
  };

  return (
    <div
      className={cn("flex w-full max-w-md flex-col gap-6", className)}
      {...props}>
      <Card className="shadow-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight not-dark:text-gray-900">
            Create an account
          </CardTitle>
          <CardDescription className="not-dark:text-gray-600">
            Signup with your Google or GitHub account
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-4">
          {/* OAuth SignUp Buttons*/}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <OAuthButton
              label="Google"
              provider="google"
              icon={FcGoogle}
              redirectURL={`${BaseUrl}/auth/google`}
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2"
              aria-label="Sign up with Google"
            />
            <OAuthButton
              label="GitHub"
              provider="github"
              icon={FaGithub}
              redirectURL={`${BaseUrl}/auth/github`}
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2"
              aria-label="Sign up with GitHub"
            />
          </div>

          {/* Separator */}
          <div className="after:border-border relative my-4 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2 not-dark:text-gray-500">
              or
            </span>
          </div>

          {/* Form */}
          <Form {...signUpForm}>
            <form
              onSubmit={signUpForm.handleSubmit(onSubmit)}
              className="grid gap-4">
              {/* Name */}
              <FormField
                control={signUpForm.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-sm dark:text-[#f1f7feb5]">Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="text-muted-foreground absolute top-1/2 left-3 size-[17px] -translate-y-1/2 transform" />
                        <Input
                          {...field}
                          type="text"
                          placeholder="John Doe"
                          disabled={isPending}
                          aria-label="Name"
                          autoComplete="name"
                          className="!h-10 pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={signUpForm.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-sm dark:text-[#f1f7feb5]">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="text-muted-foreground absolute top-1/2 left-3 size-[17px] -translate-y-1/2 transform" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="example@gmail.com"
                          disabled={isPending}
                          aria-label="Email"
                          autoComplete="email"
                          className="!h-10 pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={signUpForm.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-sm dark:text-[#f1f7feb5]">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="text-muted-foreground absolute top-1/2 left-3 size-[17px] -translate-y-1/2 transform" />
                        <Input
                          {...field}
                          type="password"
                          placeholder="Password"
                          disabled={isPending}
                          aria-label="Password"
                          autoComplete="current-password"
                          className="!h-10 pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Signup Button */}
              <Button
                type="submit"
                className={cn("mt-2 w-full", "flex items-center justify-center gap-2")}
                size="lg"
                disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Signing up...
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="mx-auto -mt-3">
          <div className="grid grid-rows-2">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to={ROUTES.SIGN_IN}
                className="text-primary font-medium hover:underline hover:underline-offset-4">
                Sign in
              </Link>
            </div>

            {/* T&C  */}
            <div className="text-muted-foreground text-center text-xs">
              By clicking continue, you agree to our{" "}
              <Link
                to={ROUTES.TERM_OF_SERVICE}
                className="text-primary font-medium hover:underline hover:underline-offset-4">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to={ROUTES.PRIVACY_POLICY}
                className="text-primary font-medium hover:underline hover:underline-offset-4">
                Privacy Policy
              </Link>
              .
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
