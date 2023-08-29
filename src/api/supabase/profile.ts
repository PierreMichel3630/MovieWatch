import { supabase } from "../supabase";

export const SUPABASE_PROFILE_TABLE = "profiles";

export const countUsernameProfile = (username: string) =>
  supabase
    .from(SUPABASE_PROFILE_TABLE)
    .select("*", { count: "exact", head: true })
    .eq("username", username);
