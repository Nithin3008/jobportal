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

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const { user } = useUser();
  return (
    <Card>
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
        <Link to={`job/${job.id}`}>
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>
        <Heart size={20} color="red" fill="red" />
      </CardFooter>
    </Card>
  );
};

export default JobCard;
