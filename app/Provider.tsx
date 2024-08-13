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

const Provider = ({ children }: { children: ReactNode }) => {
   return (
      <LiveblocksProvider authEndpoint='/api/liveblocks-auth'>
         <ClientSideSuspense fallback={<Loader />}>
            {children}
         </ClientSideSuspense>
      </LiveblocksProvider>
   )
}

export default Provider
