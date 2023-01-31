import {
  AppWrapper,
  FriendsListWithActions,
  FriendsSearch,
} from "@/components";

export default function Friends() {
  return (
    <AppWrapper>
      <FriendsSearch />
      <FriendsListWithActions />
    </AppWrapper>
  );
}
