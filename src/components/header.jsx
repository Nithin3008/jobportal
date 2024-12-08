import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { BriefcaseBusiness, PenBox } from "lucide-react";
import { useEffect, useState } from "react";
import { SignIn } from "@clerk/clerk-react";

const Header = () => {
  const [showSignIn, setShowSign] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();
  //here target refers to the div container so it was closing if we click on login box it won't work

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSign(true);
    }
  }, [search]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      console.log(e.target, e.currentTarget);
      setShowSign(false);
      setSearch({});
    }
  }
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link>
          <img src="/logo.png" className="h-20"></img>
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSign(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2"></PenBox>
                  Post a job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10",
                },
              }}
            >
              {" "}
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                ></UserButton.Link>
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/saved-jobs"
                ></UserButton.Link>
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForcedRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          ></SignIn>
        </div>
      )}
    </>
  );
};

export default Header;
