import { useSession, signIn, signOut } from "next-auth/react";
import styles from "@/styles/Login.module.css";

export default function Login() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  return (
    <div>
      {status == "authenticated" ? 
        (<div>
          <p>Signed in as {userEmail}</p>
          <button onClick={() => signOut()} className={styles.signInBtn}>Sign Out</button>
        </div>)
        : 
        (<div>
          <p>Please sign in to review classes!</p>
          <button onClick={() => signIn("github")} className={styles.signInBtn}>Sign in</button>
        </div>)
      }
    </div>
  );
}
