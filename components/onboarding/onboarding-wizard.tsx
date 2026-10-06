"use client";

import { useState } from "react";
import { saveOnboardingStep } from "@/lib/actions";
import { BUSINESS_TYPES, CAMPAIGN_OBJECTIVES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Audience, Brand, Product } from "@prisma/client";

const STEPS = ["Business", "Product / Service", "Audience", "Campaign objective", "Connect Meta"];

export function OnboardingWizard({
  brand,
  product,
  audience,
  campaignObjective,
}: {
  brand: Brand | null;
  product: Product | null;
  audience: Audience | null;
  campaignObjective: string | null;
}) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(formData: FormData) {
    setPending(true);
    setError(null);
    const result = await saveOnboardingStep(step, formData);
    setPending(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    if (step < 5) setStep((value) => value + 1);
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Step {step} of 5 — {STEPS[step - 1]}
        </p>
        <CardTitle>Set up your workspace</CardTitle>
        <CardDescription>Progress is saved on each step. You can finish without connecting Meta.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            void submit(new FormData(event.currentTarget));
          }}
        >
          {step === 1 ? (
            <>
              <Field label="Business name" name="businessName" required defaultValue={brand?.businessName} />
              <div className="space-y-2">
                <Label htmlFor="businessType">Business type</Label>
                <select id="businessType" name="businessType" defaultValue={brand?.businessType ?? ""} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">
                  <option value="">Select</option>
                  {BUSINESS_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <Field label="Industry" name="industry" defaultValue={brand?.industry} />
              <Field label="Website" name="website" defaultValue={brand?.website} />
              <Field label="Country" name="country" defaultValue={brand?.country} />
              <Field label="Currency" name="currency" defaultValue={brand?.currency ?? "USD"} />
              <div className="space-y-2">
                <Label htmlFor="brandDescription">Brand description</Label>
                <Textarea id="brandDescription" name="brandDescription" defaultValue={brand?.brandDescription ?? ""} />
              </div>
            </>
          ) : null}
          {step === 2 ? (
            <>
              <Field label="Product / service name" name="name" required defaultValue={product?.name} />
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={product?.description ?? ""} />
              </div>
              <Field label="Price" name="price" defaultValue={product?.price} />
              <Field label="Offer" name="offer" defaultValue={product?.offer} />
              <Field label="Benefits" name="benefits" defaultValue={product?.benefits} />
              <Field label="Features" name="features" defaultValue={product?.features} />
              <Field label="Landing page" name="landingPage" defaultValue={product?.landingPage} />
              <Field label="WhatsApp number" name="whatsappNumber" defaultValue={product?.whatsappNumber} />
            </>
          ) : null}
          {step === 3 ? (
            <>
              <Field label="Country" name="country" defaultValue={audience?.country} />
              <Field label="Region" name="region" defaultValue={audience?.region} />
              <Field label="City" name="city" defaultValue={audience?.city} />
              <Field label="Age min" name="ageMin" type="number" defaultValue={audience?.ageMin?.toString()} />
              <Field label="Age max" name="ageMax" type="number" defaultValue={audience?.ageMax?.toString()} />
              <Field label="Gender" name="gender" defaultValue={audience?.gender} />
              <Field label="Language" name="language" defaultValue={audience?.language} />
              <Field label="Interests" name="interests" defaultValue={audience?.interests} />
              <Field label="Custom audience" name="customAudience" defaultValue={audience?.customAudience} />
              <Field label="Lookalike audience" name="lookalikeAudience" defaultValue={audience?.lookalikeAudience} />
            </>
          ) : null}
          {step === 4 ? (
            <div className="grid gap-2">
              {CAMPAIGN_OBJECTIVES.map((objective) => (
                <label key={objective} className="flex items-center gap-2 rounded-md border p-3 text-sm">
                  <input type="radio" name="campaignObjective" value={objective} defaultChecked={campaignObjective === objective} required />
                  {objective}
                </label>
              ))}
            </div>
          ) : null}
          {step === 5 ? (
            <div className="space-y-3 rounded-lg border p-4">
              <p className="text-sm font-medium">Meta Ads connection</p>
              <p className="text-sm text-muted-foreground">
                Status: <strong>Not Connected</strong>. Connecting a Meta Business / Ad Account is Phase 4. This step does not call Meta and will not show a fake connected account.
              </p>
              <Button type="button" disabled variant="secondary">
                Connect Meta Ads Account
              </Button>
            </div>
          ) : null}
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <div className="flex justify-between gap-2">
            <Button type="button" variant="outline" disabled={step === 1 || pending} onClick={() => setStep((value) => value - 1)}>
              Back
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : step === 5 ? "Finish setup" : "Continue"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required={required} defaultValue={defaultValue ?? ""} />
    </div>
  );
}
