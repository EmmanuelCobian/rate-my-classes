import { useSession, signIn, signOut } from "next-auth/react"
import styles from '@/styles/Login.module.css'

export default function Login() {
  const { data: session, status } = useSession()
  const userEmail = session?.user?.email

  if (status === "loading") {
    return <p>Hang on there...</p>
  }

  if (status === "authenticated") {
    return (
      <div>
        <p>Signed in as {userEmail}</p>
        <button onClick={() => signOut()}>Sign out</button>
        <img src="https://cdn.pixabay.com/photo/2017/08/11/19/36/vw-2632486_1280.png" />
      </div>
    )
  }

  return (
    <div className={styles.signInContainer}>
      <p>Please sign in to review classes!</p>
      <button onClick={() => signIn("github")} className={styles.signInBtn}>Sign in</button>
    </div>
  )
}