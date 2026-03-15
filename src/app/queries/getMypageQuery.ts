import { TypedSupabaseClient } from "../supabase/supabase";

export function getMypageWishlistQuery(client: TypedSupabaseClient, userId: string) {
  return client.rpc("get_user_wish_list_with_poster2" as any, {
    //user_id: userId
    user_id: "1"
  }) as any; 
}