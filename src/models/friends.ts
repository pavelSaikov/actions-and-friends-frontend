export interface CreateFriendship {
  userId: string;
  friendId: string;
}

export interface Friendship extends CreateFriendship {
  id: string;
}
