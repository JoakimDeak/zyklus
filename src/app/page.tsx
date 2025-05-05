import { ChartColumn, Download, Plus, User } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth } from '~/server/auth'
import { HydrateClient } from '~/trpc/server'

import { Button } from './_components/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './_components/DropdownMenu'

export default async function Home() {
  const session = await auth()
  if (!session?.user) {
    redirect('api/auth/signin')
  }

  return (
    <HydrateClient>
      <main className="bg-background min-h-screen">
        <nav className="fixed bottom-0 w-screen h-12 bg-sidebar-primary flex items-center justify-between px-4">
          <Button size="icon">
            <ChartColumn />
          </Button>
          <div className="w-10" />
          <Button size="icon" variant="outline">
            <Plus />
          </Button>
          <Button size="icon">
            <Download />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline">
                <User />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </main>
    </HydrateClient>
  )
}
