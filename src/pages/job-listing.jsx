import { getJobs } from "@/api/jobsApi";
import userFetch from "@/hooks/user-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { useEffect, useState } from "react";
import JobCard from "@/components/jobcard";
const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const {
    loading: loadingJobs,
    fun: fetchJobs,
    data: JobsData,
  } = userFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  console.log(JobsData);
  useEffect(() => {
    if (isLoaded) fetchJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7n7" />;
  }

  return (
    <div>
      <h1 className="gradient-title front-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7n7"></BarLoader>
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {JobsData?.length ? (
            JobsData.map((job) => {
              return <JobCard key={job.id} job={job} />;
            })
          ) : (
            <div>No jobs found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
