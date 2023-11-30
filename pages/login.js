import { useSession, signIn, signOut } from "next-auth/react";
import Button from "react-bootstrap/Button";
import styles from "@/styles/Login.module.css";

export default function Login() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const userName = session?.user?.name;

  return (
    <div>
      {status == "authenticated" ? (
        <div>
          <Button variant="light" onClick={() => signOut()}>
            Sign Out {userName}
          </Button>
        </div>
      ) : (
        <div>
          <Button variant="dark" onClick={() => signIn("github")}>
            Sign in
          </Button>
        </div>
      )}
    </div>
  );
}
