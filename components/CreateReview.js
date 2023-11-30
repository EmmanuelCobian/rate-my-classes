import { useSession } from "next-auth/react"

export default function CreateReview() {
    
    if (session?.user.role === "admin") {
        return <p>You can make reviews, welcome!</p>
      }
    
      return <p>Please sign in to make a user review!</p>
}