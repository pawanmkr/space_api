export default function extractData(user, space) {
    return {
        userName: user.username,
        userJoinedAt: user.joined_at,
        shareableSpaceId: space.id,
        spaceName: space.name,
        spaceCreatedAt: space.created_at,
        spaceMaxCapacity: space.capacity,
    };
}