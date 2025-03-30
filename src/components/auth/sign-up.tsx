import {Link} from "react-router";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useMutation} from "@tanstack/react-query";
import {FaGithub} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";

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
import {signUpMutationFn} from "./use-auth";
import {cn} from "@/lib/utils";
import {signUpSchema} from "./auth-schemas";
import {BaseUrl} from "@/constants";
import {OAuthButton} from "./oauth-button";

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
          <CardTitle className="text-2xl font-semibold tracking-tight">Create an account</CardTitle>
          <CardDescription>Signup with your Google or GitHub account</CardDescription>
        </CardHeader>

        <CardContent className="pb-4">
          {/* OAuth Sign Up */}
          <div className="flex flex-col gap-4">
            <OAuthButton
              label="Sign up"
              provider="google"
              icon={FcGoogle}
              redirectURL={`${BaseUrl}/auth/google`}
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2"
              aria-label="Sign up with Google"
            />
            <OAuthButton
              label="Sign up"
              provider="github"
              icon={FaGithub}
              redirectURL={`${BaseUrl}/auth/github`}
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2"
              aria-label="Sign up with GitHub"
            />
          </div>

          {/* Separator */}
          <div className="relative my-4 text-center text-sm">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-full border-t"></span>
            </div>
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
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
                      <Input
                        {...field}
                        type="text"
                        placeholder="John Doe"
                        disabled={isPending}
                        aria-label="Name"
                        autoComplete="name"
                        className="!h-10"
                      />
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
                      <Input
                        {...field}
                        type="email"
                        placeholder="example@gmail.com"
                        disabled={isPending}
                        aria-label="Email"
                        autoComplete="email"
                        className="!h-10"
                      />
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
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                        disabled={isPending}
                        aria-label="Password"
                        autoComplete="current-password"
                        className="!h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Signup Button */}
              <Button
                type="submit"
                className="mt-2 w-full"
                size="lg"
                disabled={isPending}>
                {isPending ? "Signing up..." : "Sign up"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="mx-auto -mt-3">
          <div className="grid grid-rows-2">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-primary font-medium hover:underline hover:underline-offset-4">
                Sign in
              </Link>
            </div>

            {/* T&C  */}
            <div className="text-muted-foreground text-center text-xs">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms-of-service"
                className="text-primary font-medium hover:underline hover:underline-offset-4">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy-policy"
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
