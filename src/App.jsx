import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/app-layout";
import LandingPage from "./pages/landingPage";
import Onboarding from "./pages/onboarding";
import JobListing from "./pages/job-listing";
import Job from "./pages/job";
import PostJob from "./pages/post-job";
import SavedJob from "./pages/saved-job";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/onboarding",
          element: <Onboarding />,
        },
        {
          path: "/jobs",
          element: <JobListing />,
        },
        {
          path: "/post-job",
          element: <PostJob />,
        },
        {
          path: "/my-jobs",
          element: <Job />,
        },
        {
          path: "/saved-jobs",
          element: <SavedJob />,
        },
        {
          path: "/job/:id",
          element: <PostJob />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
