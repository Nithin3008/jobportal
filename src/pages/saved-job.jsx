import { getSavedjobs } from "@/api/jobsApi";
import userFetch from "@/hooks/User-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/jobcard";

const SavedJob = () => {
  const { isLoaded } = useUser();
  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fun: fnSavedJobs,
  } = userFetch(getSavedjobs);

  useEffect(() => {
    if (isLoaded) fnSavedJobs();
  }, [isLoaded]);

  if (!isLoaded || loadingSavedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7n7" />;
  }
  return (
    <div>
      <h1 className="gradient-title front-extrabold text-6xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h1>

      {loadingSavedJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedJobs?.length ? (
            savedJobs.map((saved) => {
              return (
                <JobCard
                  key={saved.id}
                  job={saved?.job}
                  savedInit={true}
                  onJobSaved={fnSavedJobs}
                />
              );
            })
          ) : (
            <div>No saved jobs found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJob;
