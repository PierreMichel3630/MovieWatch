import { CheckInsert, RankInsert, RankUpdate } from "src/models/Rank";
import { supabase } from "../supabase";

export const SUPABASE_RANK_TABLE = "rank";

export const getRanks = () => {
  return supabase.from(SUPABASE_RANK_TABLE).select("*, value!inner(*)");
};

export const getRanksByTheme = (idTheme: number) => {
  return supabase
    .from(SUPABASE_RANK_TABLE)
    .select("*, value!inner(*)")
    .eq("value.theme", idTheme)
    .order("notation", { ascending: false });
};

export const getRanksByIdExtern = (
  id: number,
  idTheme: number,
  type: string
) => {
  return supabase
    .from(SUPABASE_RANK_TABLE)
    .select()
    .eq("id_extern", id)
    .eq("theme", idTheme)
    .eq("type", type)
    .maybeSingle();
};

export const insertCheck = (value: CheckInsert) =>
  supabase.from(SUPABASE_RANK_TABLE).insert({ ...value });

export const updateRank = (value: RankUpdate) =>
  supabase.from(SUPABASE_RANK_TABLE).update(value).eq("id", value.id);

export const insertRank = (value: RankInsert) =>
  supabase.from(SUPABASE_RANK_TABLE).insert(value);

export const deleteRank = (id: number) =>
  supabase.from(SUPABASE_RANK_TABLE).delete().eq("id", id);

export const getRankByUser = (
  useruuid: string,
  idtheme: number,
  language: number
) =>
  supabase.rpc("getrankbyuserandlanguage", {
    language,
    idtheme,
    useruuid,
  });

export const getRanksByUserAndThemeAndType = (
  idTheme: number,
  user_uuid: string,
  type: string
) => {
  return supabase
    .from(SUPABASE_RANK_TABLE)
    .select()
    .eq("theme", idTheme)
    .eq("user_uuid", user_uuid)
    .eq("type", type)
    .order("notation", { ascending: false, nullsFirst: false });
};
