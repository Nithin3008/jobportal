import { getJobs } from "@/api/jobsApi";
import userFetch from "@/hooks/User-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { useEffect, useState } from "react";
import JobCard from "@/components/jobcard";
import { getCompanies } from "@/api/apiCompanies";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";

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

  const { fun: fnCompanies, data: companyData } = userFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fetchJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7n7" />;
  }
  function clearFilters() {
    setCompany_id("");
    setLocation("");
    setSearchQuery("");
  }
  function handleSearch(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  }
  return (
    <div>
      <h1 className="gradient-title front-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      <form onSubmit={handleSearch} className="h-14 flex w-full py-2 gap-2">
        <Input
          type="text"
          placeholder="Search jobs by title..."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by state" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* by Company names */}
        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companyData?.map(({ name, id }) => {
                return (
                  <SelectItem key={id} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          onClick={clearFilters}
          variant="destructive"
          className="sm:w-1/2"
        >
          Clear Filters
        </Button>
      </div>
      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7n7"></BarLoader>
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {JobsData?.length ? (
            JobsData.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
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
