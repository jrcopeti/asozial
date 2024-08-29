import { Card } from "@/components/ui/card";
import DashboardFriendItem from "./FriendshipItem";
import { Friendship } from "@/types/Friendship";

function FriendshipAcceptedCard({ accepted }: { accepted: Friendship[] }) {
  return (
    <>
      {accepted && accepted.length > 0 ? (
        accepted.map(
          (friendship: Friendship) =>
            friendship !== null && (
              <Card
                key={friendship.senderId?._id.toString()}
                className="relative mb-4 w-full border-dashed border-zinc-300 bg-inherit bg-zinc-100 p-4 hover:bg-zinc-200/10 dark:border-zinc-600 dark:bg-inherit dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-700/10 lg:max-w-[45%]"
              >
                <DashboardFriendItem
                  key={friendship.senderId?._id.toString()}
                  friendshipId={friendship._id}
                  userId={friendship.senderId?._id}
                  username={friendship.senderId?.username}
                  image={friendship.senderId?.info.image}
                  status="accepted"
                />
              </Card>
            ),
        )
      ) : (
        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
          No accepted friends yet
        </p>
      )}
    </>
  );
}

export default FriendshipAcceptedCard;