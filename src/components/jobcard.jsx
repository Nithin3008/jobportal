import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { saveJob } from "@/api/jobsApi";
import userFetch from "@/hooks/User-fetch";
import { useEffect, useState } from "react";

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);

  const {
    loading: loadingSavedJob,
    fun: fnSavedJobs,
    data: savedJob,
  } = userFetch(saveJob, {
    alreadySaved: saved,
  });

  const { user } = useUser();
  const handleSaveJob = async () => {
    await fnSavedJobs({
      user_id: user.id,
      job_id: job.id,
    });
    setSaved((save) => !save);
    onJobSaved();
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {/* issue */}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex  justify-between">
          {job.company && <img src={job.company.logo} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`}>
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            disabled={loadingSavedJob}
            onClick={handleSaveJob}
          >
            {saved ? (
              <Heart size={20} color="red" fill="red" />
            ) : (
              <Heart size={20} color="red" />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
