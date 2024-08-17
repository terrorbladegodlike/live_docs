import {nanoid} from 'nanoid'
import { liveblocks } from '../liveblocks';

export const createDocument = async({userId, email} : createDocumentParams) => {
  const roomId = nanoid()

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: 'Untitled'
    }

    const userAccesses: RoomAccesses = {
      [email]: ['room:write']
    }

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: []
    });
  } catch (error) {
    console.log(`Error happened while creating a room: ${error}`);
  }
}