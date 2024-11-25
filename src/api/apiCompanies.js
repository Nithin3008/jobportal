import supabaseClient from "@/utils/supabase";

export async function getCompanies(token) {
  const supbase = await supabaseClient(token);

  const { data, error } = await supbase.from("companies").select("*");

  if (error) {
    console.error("Error fetching companies:", error);
    return null;
  }
  return data;
}
