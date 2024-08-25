'use client'

// Import ReactNode from React
import { ReactNode } from 'react'

// Import Component from LiveBlocks
import {
   LiveblocksProvider,
   RoomProvider,
   ClientSideSuspense,
} from '@liveblocks/react/suspense'

// Import Components
import Loader from '@/components/Loader'
import { getClerkUsers, getDocumentUsers } from '@/lib/actions/user.actions'
import { useUser } from '@clerk/nextjs'

const Provider = ({ children }: { children: ReactNode }) => {
   const { user: clerkUser } = useUser()

   return (
      <LiveblocksProvider
         authEndpoint='/api/liveblocks-auth'
         resolveUsers={async ({ userIds }) => {
            const users = await getClerkUsers({ userIds })

            return users
         }}
         resolveMentionSuggestions={async ({ text, roomId }) => {
            const roomUsers = await getDocumentUsers({
               roomId,
               currentUser: clerkUser?.emailAddresses[0].emailAddress   !,
               text,
            })

            return roomUsers
         }}
      >
         <ClientSideSuspense fallback={<Loader />}>
            {children}
         </ClientSideSuspense>
      </LiveblocksProvider>
   )
}

export default Provider
