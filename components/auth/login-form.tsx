"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { activateDemoWorkspace } from "@/lib/actions";
import { APP_NAME, DEMO_EMAIL, DEMO_PASSWORD } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const demoMode = params.get("demo") === "1";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const { error: signInError } = await authClient.signIn.email({ email, password });
    setPending(false);
    if (signInError) {
      setError(signInError.message ?? "Could not sign in.");
      return;
    }
    router.push(params.get("next") || "/app");
    router.refresh();
  }

  async function onDemo() {
    setPending(true);
    setError(null);
    const signedIn = await authClient.signIn.email({ email: DEMO_EMAIL, password: DEMO_PASSWORD });
    if (signedIn.error) {
      const signedUp = await authClient.signUp.email({
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
        name: "Demo Marketer",
      });
      if (signedUp.error) {
        setPending(false);
        setError(signedUp.error.message ?? "Could not open demo.");
        return;
      }
    }
    await activateDemoWorkspace();
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Log in to {APP_NAME}</CardTitle>
        <CardDescription>Email and password. Sessions are cookie-based.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required defaultValue={demoMode ? DEMO_EMAIL : ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required minLength={8} defaultValue={demoMode ? DEMO_PASSWORD : ""} />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button className="w-full" type="submit" disabled={pending}>
            {pending ? "Signing in…" : "Log in"}
          </Button>
          <Button className="w-full" type="button" variant="outline" disabled={pending} onClick={() => void onDemo()}>
            View Demo
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            No account?{" "}
            <Link className="underline" href="/register">
              Start free
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
