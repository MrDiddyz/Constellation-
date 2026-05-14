import { z } from "zod";

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    NEXT_PUBLIC_APP_ENV: z
      .enum(["local", "dev", "staging", "prod"])
      .default("local"),
    NEXT_PUBLIC_APP_NAME: z.string().min(1).default("MURMUR Core"),
    SUPABASE_URL: z.string().url().optional(),
    SUPABASE_ANON_KEY: z.string().min(1).optional(),
    INTERNAL_API_TOKEN: z.string().min(32).optional(),
    LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  })
  .superRefine((env, ctx) => {
    const hasSupabaseUrl = Boolean(env.SUPABASE_URL);
    const hasSupabaseAnon = Boolean(env.SUPABASE_ANON_KEY);

    if (hasSupabaseUrl !== hasSupabaseAnon) {
      ctx.addIssue({
        code: "custom",
        message: "SUPABASE_URL and SUPABASE_ANON_KEY must be provided together.",
      });
    }
  });

type Env = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(`Invalid environment configuration: ${parsed.error.message}`);
}

export const env: Env = parsed.data;
