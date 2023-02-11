export default async function extractData(user, space, chatHistory) {
    return {
        userId: user.id,
        userName: user.username,
        userJoinedAt: user.joined_at,
        shareableSpaceId: space.share_id,
        spaceName: space.name,
        spaceCreatedAt: space.created_at,
        spaceMaxCapacity: space.capacity,
        chats: chatHistory
    };
}