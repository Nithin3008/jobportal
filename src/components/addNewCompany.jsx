import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import userFetch from "@/hooks/User-fetch";
import { addNewCompany } from "@/api/apiCompanies";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";

function AddNewCompany({ fetchCompanies }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    fnAddCompany({ ...data, logo: data.logo[0] });
  }

  const {
    loading: loadingAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
    fun: fnAddCompany,
  } = userFetch(addNewCompany);

  useEffect(() => {
    if (dataAddCompany?.length > 0) fetchCompanies();
  }, [loadingAddCompany]);

  return (
    <Drawer className=" w-1/2 mx-auto">
      <DrawerTrigger>
        <Button type="button" size="sm" variant="secondary">
          Add Company
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a new company</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <form className=" flex gap-2 p-4 pb-0">
          <Input placeholder="Company name" {...register("name")} />

          {/* Company Logo */}
          <Input
            type="file"
            accept="image/*"
            className=" file:text-gray-500"
            {...register("logo")}
          />
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            variant="destructive"
          >
            Add
          </Button>
        </form>

        <DrawerFooter>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}
          {errorAddCompany?.message && (
            <p className="text-red-500">{errorAddCompany?.message}</p>
          )}
          {loadingAddCompany && <BarLoader width={"100%"} color="#36d7b7" />}
          <DrawerClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AddNewCompany;
