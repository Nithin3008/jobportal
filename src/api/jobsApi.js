import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    //here we getting the data from company,saved_jobs table too
    .select("*, company:companies(name,logo), saved:saved_jobs(id)");

  if (location) {
    query = query.eq("location", location);
  }
  if (company_id) {
    query = query.eq("location", location);
  }
  if (searchQuery) {
    //if the title contains the search query only those will be returned
    query = query.ilike("title", `%${searchQuery}%`);
  }
  const { data, error } = await query;

  if (error) {
    console.log("Error fetching jobs:", error);
    return null;
  }
  return data;
}
