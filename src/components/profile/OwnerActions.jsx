'use client'
import { useAuth } from '@/components/auth/AuthProvider'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icons'

// Shows "Edit profile" only to the profile's owner.
export default function OwnerActions({ profileId }) {
  const { user } = useAuth()
  if (user?.id !== profileId) return null
  return (
    <Button href="/profile" variant="outline" size="sm">
      <Icon name="edit" className="h-4 w-4" /> প্রোফাইল এডিট
    </Button>
  )
}
