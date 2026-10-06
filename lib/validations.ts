import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

export const clientSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(120),
  industry: z.string().max(80).optional().or(z.literal("")),
  website: z.string().max(200).optional().or(z.literal("")),
  status: z.enum(["ACTIVE", "PAUSED", "ARCHIVED"]),
  notes: z.string().max(2000).optional().or(z.literal("")),
});

export const brandSchema = z.object({
  businessName: z.string().min(2).max(120),
  businessType: z.string().max(80).optional().or(z.literal("")),
  industry: z.string().max(80).optional().or(z.literal("")),
  website: z.string().max(200).optional().or(z.literal("")),
  country: z.string().max(80).optional().or(z.literal("")),
  currency: z.string().max(8).optional().or(z.literal("")),
  brandDescription: z.string().max(2000).optional().or(z.literal("")),
});

export const productSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().max(2000).optional().or(z.literal("")),
  price: z.string().max(80).optional().or(z.literal("")),
  offer: z.string().max(200).optional().or(z.literal("")),
  benefits: z.string().max(2000).optional().or(z.literal("")),
  features: z.string().max(2000).optional().or(z.literal("")),
  landingPage: z.string().max(200).optional().or(z.literal("")),
  whatsappNumber: z.string().max(40).optional().or(z.literal("")),
});

export const audienceSchema = z.object({
  country: z.string().max(80).optional().or(z.literal("")),
  region: z.string().max(80).optional().or(z.literal("")),
  city: z.string().max(80).optional().or(z.literal("")),
  ageMin: z.string().optional().or(z.literal("")),
  ageMax: z.string().optional().or(z.literal("")),
  gender: z.string().max(40).optional().or(z.literal("")),
  language: z.string().max(40).optional().or(z.literal("")),
  interests: z.string().max(500).optional().or(z.literal("")),
  customAudience: z.string().max(200).optional().or(z.literal("")),
  lookalikeAudience: z.string().max(200).optional().or(z.literal("")),
});

export const workspaceSettingsSchema = z.object({
  organizationName: z.string().min(2).max(120),
  workspaceName: z.string().min(2).max(120),
});
