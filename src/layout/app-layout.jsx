import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <div className="grid-background"></div>
      <main className="min-h-screen container mx-auto">
        <Header></Header>
        <Outlet></Outlet>
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">Made by Nithin</div>
    </>
  );
};

export default AppLayout;
