import { getApplications } from "@/api/apiApplication";
import userFetch from "@/hooks/User-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./applicationCard";

function CreateApplication() {
  const { user } = useUser();
  const {
    loading: loadingApplication,
    data: applications,
    fun: fnApplications,
  } = userFetch(getApplications, { user_id: user.id });

  useEffect(() => {
    fnApplications();
  }, []);

  if (loadingApplication) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div className="flex flex-col gap-2">
      {applications?.map((application) => {
        return (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate={true}
          />
        );
      })}
    </div>
  );
}

export default CreateApplication;