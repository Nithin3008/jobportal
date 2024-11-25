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
import ProtecedRoute from "./components/protected-route";
import JobPage from "./pages/jobPage";

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
          element: (
            <ProtecedRoute>
              <Onboarding />
            </ProtecedRoute>
          ),
        },
        {
          path: "/jobs",
          element: (
            <ProtecedRoute>
              <JobListing />
            </ProtecedRoute>
          ),
        },
        {
          path: "/post-job",
          element: (
            <ProtecedRoute>
              <PostJob />
            </ProtecedRoute>
          ),
        },
        {
          path: "/my-jobs",
          element: (
            <ProtecedRoute>
              <Job />
            </ProtecedRoute>
          ),
        },
        {
          path: "/saved-jobs",
          element: (
            <ProtecedRoute>
              <SavedJob />
            </ProtecedRoute>
          ),
        },
        {
          path: "/job/:id",
          element: (
            <ProtecedRoute>
              <JobPage></JobPage>
            </ProtecedRoute>
          ),
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
