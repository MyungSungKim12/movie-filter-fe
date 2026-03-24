import { TypedSupabaseClient } from "../supabase/supabase";

export function getProfileImageQuery(client: TypedSupabaseClient, userId: string) {
  return client
    .from("mf_users_info")
    .select("ui_image, ui_name, ui_email")
    .eq("ui_id", userId)
    .single();
}

export function getMypageWishlistQuery(client: TypedSupabaseClient, userId: string) {
  return client.rpc("get_user_wish_list_with_poster2" as any, {
    user_id: userId,
  }) as any;
}

export function getMypageClickLogQuery(client: TypedSupabaseClient, userId: string) {
  return client.rpc("get_user_click_log_with_movie" as any, {
    user_id: userId,
  }) as any;
}

export function getMypagePreferenceStatsQuery(client: TypedSupabaseClient, userId: string) {
  return client.rpc("get_user_preference_stats" as any, {
    user_id: userId,
  }) as any;
}