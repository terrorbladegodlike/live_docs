// import Components
import CollaborativeRoom from '@/components/CollaborativeRoom'

// Import Actions
import { getDocument } from '@/lib/actions/room.actions'

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

   // TODO: Assets the permissions of the user to access  the document

   return (
      <main className='flex w-full flex-col items-center'>
         <CollaborativeRoom roomId={id} roomMetadata={room.metadata} />
      </main>
   )
}

export default Document
