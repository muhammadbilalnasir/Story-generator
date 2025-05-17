"use client"
import { useRouter } from "next/navigation"

import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/components/auth/AuthProvider"
import { Button } from "@/components/ui/button"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Loader2, Wand2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function Navbar() {
  const { user } = useAuth()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await signOut(auth)
      router.push("/auth/login")
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setIsLoggingOut(false)
      setShowLogoutConfirm(false)
    }
  }

  return (
    <>
      <nav className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold flex text-center gap-4 text-pink-600">
              <Wand2 className="h-8 w-8 text-indigo-500" />
              StoryForge AI
            </Link>
            <div className="space-x-4">
              {user ? (
                <>
                  <Link href="/create">
                    <Button variant="ghost">Create</Button>
                  </Link>
                  <Link href="/bookmarks">
                    <Button variant="ghost">Library</Button>
                  </Link>
                  <Link href="/settings">
                    <Button variant="ghost">Settings</Button>
                  </Link>
                  <Button variant="outline" onClick={() => setShowLogoutConfirm(true)}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button>Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>Are you sure you want to log out of your account?</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 sm:justify-end">
            <Button variant="outline" onClick={() => setShowLogoutConfirm(false)} disabled={isLoggingOut}>
              Cancel
            </Button>
            <Button onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging out...
                </>
              ) : (
                "Logout"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

