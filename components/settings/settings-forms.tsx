"use client";

import { useState } from "react";
import { createWorkspace, saveBrandSettings, saveWorkspaceSettings } from "@/lib/actions";
import { BUSINESS_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Brand } from "@prisma/client";

export function SettingsForms({
  organizationName,
  workspaceName,
  userName,
  userEmail,
  role,
  brand,
}: {
  organizationName: string;
  workspaceName: string;
  userName: string;
  userEmail: string;
  role: string;
  brand: Brand | null;
}) {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        className="space-y-3 rounded-xl border p-5"
        onSubmit={async (event) => {
          event.preventDefault();
          const result = await saveWorkspaceSettings(new FormData(event.currentTarget));
          setMessage(result?.error ?? "Organization and workspace saved.");
        }}
      >
        <h2 className="font-semibold">Organization & workspace</h2>
        <div className="space-y-2">
          <Label htmlFor="organizationName">Organization</Label>
          <Input id="organizationName" name="organizationName" required defaultValue={organizationName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="workspaceName">Workspace</Label>
          <Input id="workspaceName" name="workspaceName" required defaultValue={workspaceName} />
        </div>
        <Button type="submit">Save</Button>
      </form>
      <form
        className="space-y-3 rounded-xl border p-5"
        onSubmit={async (event) => {
          event.preventDefault();
          const result = await saveBrandSettings(new FormData(event.currentTarget));
          setMessage(result?.error ?? "Brand saved.");
        }}
      >
        <h2 className="font-semibold">Brand setup</h2>
        <div className="space-y-2">
          <Label htmlFor="businessName">Business name</Label>
          <Input id="businessName" name="businessName" required defaultValue={brand?.businessName ?? ""} />
        </div>
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
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input id="industry" name="industry" defaultValue={brand?.industry ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" name="website" defaultValue={brand?.website ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input id="country" name="country" defaultValue={brand?.country ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Input id="currency" name="currency" defaultValue={brand?.currency ?? "USD"} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="brandDescription">Brand description</Label>
          <Textarea id="brandDescription" name="brandDescription" defaultValue={brand?.brandDescription ?? ""} />
        </div>
        <Button type="submit">Save brand</Button>
      </form>
      <form
        className="space-y-3 rounded-xl border p-5"
        onSubmit={async (event) => {
          event.preventDefault();
          await createWorkspace(new FormData(event.currentTarget));
        }}
      >
        <h2 className="font-semibold">New workspace</h2>
        <div className="space-y-2">
          <Label htmlFor="name">Workspace name</Label>
          <Input id="name" name="name" required />
        </div>
        <Button type="submit" variant="outline">
          Create workspace
        </Button>
      </form>
      <div className="space-y-2 rounded-xl border p-5 text-sm">
        <h2 className="font-semibold">Profile</h2>
        <p>{userName}</p>
        <p>{userEmail}</p>
        <p>Role: {role}</p>
        {message ? <p className="text-muted-foreground">{message}</p> : null}
      </div>
    </div>
  );
}
