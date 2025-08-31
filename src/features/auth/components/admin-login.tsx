"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, AlertCircle, Shield } from "lucide-react";

import Show from "@/components/show";
import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/extend/form";
import { InputV1 } from "@/components/extend/input/v1";
import GoogleIcon from "@/components/icons/google-icon";
import { ButtonV1 } from "@/components/extend/button/v1";
import { PasswordInputV1 } from "@/components/extend/password-input/v1";

import { loginSchema } from "../schemas";
import {
  useLoginMutation,
  useGoogleLoginMutation,
} from "../hooks/use-auth-mutations";

import type { TLoginFormData } from "../schemas";

export default function AdminLogin() {
  const loginMutation = useLoginMutation();
  const googleLoginMutation = useGoogleLoginMutation();

  const form = useForm<TLoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const { control, formState, handleSubmit, setError, clearErrors } = form;
  const { errors, isSubmitting } = formState;

  const isLoading =
    isSubmitting || loginMutation.isPending || googleLoginMutation.isPending;

  const onSubmit = async (data: TLoginFormData) => {
    try {
      clearErrors();
      await loginMutation.mutateAsync(data);
    } catch (error: any) {
      // Handle specific validation errors from server
      if (error?.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        Object.keys(serverErrors).forEach((field) => {
          setError(field as keyof TLoginFormData, {
            message: serverErrors[field],
          });
        });
      } else {
        setError("root", {
          message:
            error?.response?.data?.message || "Login failed. Please try again.",
        });
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      clearErrors();
      await googleLoginMutation.mutateAsync();
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-4 text-center">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-center mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Admin Login</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access the admin panel
        </p>
      </div>

      <Show when={errors.root}>
        {({ message }) => (
          <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}
      </Show>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          <FormField control={control} name="email" label="Email">
            {({ field }) => (
              <InputV1
                type="email"
                disabled={isLoading}
                startChild={<Mail className="size-4" />}
                placeholder="admin@example.com"
                autoCorrect="off"
                autoComplete="email"
                autoCapitalize="none"
                {...field}
              />
            )}
          </FormField>

          <FormField control={control} name="password" label="Password">
            {({ field }) => (
              <PasswordInputV1
                disabled={isLoading}
                startChild={<Lock className="size-4" />}
                placeholder="Enter your password"
                autoComplete="current-password"
                {...field}
              />
            )}
          </FormField>

          <FormField
            name="rememberMe"
            label="Remember me for 30 days"
            control={control}
            labelProps={{
              className: "text-sm font-normal cursor-pointer",
            }}
            formItemProps={{
              className:
                "flex flex-row-reverse space-x-2 space-y-0 items-center justify-end",
            }}
            isShowErrorMessage={false}
          >
            {({ field: { value, onChange } }) => (
              <Checkbox
                checked={value}
                disabled={isLoading}
                onCheckedChange={onChange}
              />
            )}
          </FormField>

          <ButtonV1
            loading={{
              when: isLoading,
              text: "Signing In...",
            }}
            className="w-full"
            type="submit"
          >
            Sign In
          </ButtonV1>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <ButtonV1
            variant="outline"
            type="button"
            loading={{
              when: googleLoginMutation.isPending,
              text: "Signing in with Google...",
              align: "end",
            }}
            startChild={<GoogleIcon className="mr-2 h-4 w-4" />}
            onClick={handleGoogleLogin}
            className="w-full"
          >
            Continue with Google
          </ButtonV1>
        </form>
      </Form>
    </div>
  );
}
