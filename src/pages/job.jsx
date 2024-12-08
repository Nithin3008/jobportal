import CreateApplication from "@/components/createApplication";
import CreatedJobs from "@/components/createdJobs";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";

const Job = () => {
  const { user, isLoaded } = useUser();
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div>
      <h1 className="gradient-title front-extrabold text-6xl sm:text-7xl text-center pb-8">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Applications"
          : "My Jobs"}
      </h1>
      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreateApplication />
      ) : (
        <CreatedJobs />
      )}
    </div>
  );
};

export default Job;
