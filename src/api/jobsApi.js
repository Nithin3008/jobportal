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
    query = query.eq("company_id", company_id);
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

export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);

  console.log(alreadySaved, "savejob function");
  if (alreadySaved) {
    // If the job is already saved, remove it
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (deleteError) {
      console.error("Error removing saved job:", deleteError);
      return data;
    }

    return data;
  } else {
    // If the job is not saved, add it to saved jobs
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (insertError) {
      console.error("Error saving job:", insertError);
      return data;
    }

    return data;
  }
}

export async function getSingleJob(token, { job_id }) {
  const supbase = await supabaseClient(token);

  const { data, error } = await supbase
    .from("jobs")
    .select("*,company:companies(name,logo), application:application(*)")
    .eq("id", job_id)
    .single();

  if (error) {
    console.error("Error fetching Job:", error);
    return null;
  }
  return data;
}
export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supbase = await supabaseClient(token);

  const { data, error } = await supbase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error Updating companies:", error);
    return null;
  }
  return data;
}

export async function addNewJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error Creating Job");
  }

  return data;
}

export async function getSavedjobs(token) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job:jobs(*,company:companies(name,logo))");

  if (error) {
    console.error(error);
    throw new Error("Error Creating Job");
  }

  return data;
}
