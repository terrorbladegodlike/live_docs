import { liveblocks } from '@/lib/liveblocks';
import { currentUser } from '@clerk/nextjs/server';


export async function POST(request: Request) {
  const clerkUser = await currentUser()
  // Get the current user from your database
  const user = __getUserFromDB__(request);

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.id,
      groupIds, // Optional
    },
    { userInfo: user.metadata },
  );

  return new Response(body, { status });
}