import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import { signupFn, resendConfirmationFn } from "#/server/auth";

export function SignUpTab({ onSuccess }: { onSuccess?: () => void }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => () => clearInterval(timerRef.current), []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const email = data.email as string;
    const password = data.password as string;

    const result = await signupFn({ data: { email, password } });

    if (result?.error) {
      setError(result.message);
      setLoading(false);
      return;
    }

    setSuccess(email);
    setLoading(false);
    onSuccess?.();
  }

  async function handleResend() {
    setResending(true);
    await resendConfirmationFn({ data: { email: success } });
    setResending(false);
    setCooldown(60);
    timerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <p className="text-sm font-medium">Check your email</p>
        <p className="text-xs text-muted">
          We sent a confirmation link to <strong>{success}</strong>
        </p>
        <Button
          variant="ghost"
          size="sm"
          onPress={handleResend}
          isPending={resending}
          isDisabled={cooldown > 0}
          className="mt-1"
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend link"}
        </Button>
      </div>
    );
  }

  return (
    <Form className="flex flex-col gap-4 py-4" onSubmit={onSubmit}>
      <TextField isRequired name="email" type="email">
        <Label>Email</Label>
        <Input
          placeholder="you@example.com"
          variant="secondary"
          className="focus:ring-inset"
        />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        name="password"
        type="password"
        minLength={6}
        validate={(v) => (v.length < 6 ? "Must be at least 6 characters" : null)}
      >
        <Label>Password</Label>
        <Input
          placeholder="Min. 6 characters"
          variant="secondary"
          className="focus:ring-inset"
        />
        <FieldError />
      </TextField>
      {error && <p className="text-xs text-danger">{error}</p>}
      <Button type="submit" variant="primary" isPending={loading} className="w-full" data-umami-event="auth sign up">
        Create Account
      </Button>
    </Form>
  );
}
