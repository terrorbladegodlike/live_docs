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
import { getClerkUsers } from '@/lib/actions/user.actions'

const Provider = ({ children }: { children: ReactNode }) => {
   return (
      <LiveblocksProvider
         authEndpoint='/api/liveblocks-auth'
         resolveUsers={async ({ userIds }) => {
            const users = await getClerkUsers({ userIds })

            return users
         }}
      >
         <ClientSideSuspense fallback={<Loader />}>
            {children}
         </ClientSideSuspense>
      </LiveblocksProvider>
   )
}

export default Provider
