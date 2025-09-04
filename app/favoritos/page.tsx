import { redirect } from "next/navigation"

export default function FavoritesPage() {
  // Redirect to dashboard favorites tab
  redirect("/dashboard?tab=favorites")
}
