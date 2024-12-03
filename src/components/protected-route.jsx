import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
const ProtecedRoute = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();
  const nav = useNavigate();

  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to="/?sign-in=true" />;
  }

  if (!user?.unsafeMetadata?.role && pathname !== "/onboarding") {
    nav("/onboarding");
    return null;
  }
  return children;
};

export default ProtecedRoute;
