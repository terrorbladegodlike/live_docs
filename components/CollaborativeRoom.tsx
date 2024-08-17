'use client'
// Import Components from LiveBlocks
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense'

// Import Components
import Header from './Header'
import ActiveCollaborators from './ActiveCollaborators'

// Import Components from Clerk
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Editor } from './editor/Editor'

const CollaborativeRoom = ({
   roomId,
   roomMetadata,
}: CollaborativeRoomProps) => {
   return (
      <RoomProvider id={roomId}>
         <ClientSideSuspense fallback={<div>Loading…</div>}>
            <div className='collaborative-room'>
               <Header>
                  <div className='flex w-fit items-center justify-center gap-2'>
                     <p className='document-title'>Share</p>
                  </div>
                  <div className='flex w-full flex-1 justify-end gap-2 sm:gap-3'>
                     <ActiveCollaborators />
                     <SignedOut>
                        <SignInButton />
                     </SignedOut>
                     <SignedIn>
                        <UserButton />
                     </SignedIn>
                  </div>
               </Header>
               <Editor />
            </div>
         </ClientSideSuspense>
      </RoomProvider>
   )
}

export default CollaborativeRoom
