import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Signin() {
  const router = useRouter();
  const { status } = useSession();
  const query = router.query;

  useEffect(() => {
    if (status === "unauthenticated") {
      void signIn("github");
    } else if (status === "authenticated") {
      void router.push("/createReviewPage?courseCode=" + query.courseCode + "&title=" + query.title);
    }
  }, [status]);

  return <div></div>;
}