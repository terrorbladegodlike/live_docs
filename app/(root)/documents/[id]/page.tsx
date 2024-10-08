// import Components
import CollaborativeRoom from '@/components/CollaborativeRoom'

// Import Actions
import { getDocument } from '@/lib/actions/room.actions'
import { getClerkUsers } from '@/lib/actions/user.actions'

// Import Clerk Components
import { currentUser } from '@clerk/nextjs/server'

// Import Redirect from Next
import { redirect } from 'next/navigation'

const Document = async ({ params: { id } }: SearchParamProps) => {
   const clerkUser = await currentUser()
   if (!clerkUser) redirect('/sign-in')

   const room = await getDocument({
      roomId: id,
      userId: clerkUser.emailAddresses[0].emailAddress,
   })

   if (!room) redirect('/')

   const userIds = Object.keys(room.usersAccesses)
   const users = await getClerkUsers({ userIds })

   const usersData = users.map((user: User) => {
      if (!user || !user.email) {
         console.error('User or user.email is null/undefined', user)
         return {
            ...user,
            userType: 'viewer',
         }
      }

      return {
         ...user,
         userType: room.usersAccesses[user.email]?.includes('room:write')
            ? 'editor'
            : 'viewer',
      }
   })

   const currentUserType = room.usersAccesses[
      clerkUser.emailAddresses[0].emailAddress
   ]?.includes('room:write')
      ? 'editor'
      : 'viewer'

   return (
      <main className='flex w-full flex-col items-center'>
         <CollaborativeRoom
            roomId={id}
            roomMetadata={room.metadata}
            users={usersData}
            currentUserType={currentUserType}
         />
      </main>
   )
}

export default Document
