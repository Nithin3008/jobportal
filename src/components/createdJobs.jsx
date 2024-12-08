import { useUser } from "@clerk/clerk-react";
import userFetch from "@/hooks/User-fetch";
import { getMyJobs } from "@/api/jobsApi";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./jobcard";

function CreatedJobs() {
  const { user } = useUser();

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fun: fnCreatedJobs,
  } = userFetch(getMyJobs, {
    recruiter_id: user.id,
  });
  console.log(createdJobs, "created jobs");
  useEffect(() => {
    fnCreatedJobs();
  }, []);
  return (
    <div>
      {loadingCreatedJobs ? (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {createdJobs?.length ? (
            createdJobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  onJobAction={fnCreatedJobs}
                  isMyJob
                />
              );
            })
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
}

export default CreatedJobs;
