import { notFound } from "next/navigation";
import PageContainer from "@/components/common/PageContainer";
import getUserByUsername from "@/actions/getUserByUsername.server";
import UserComponent from "@/components/user/UserComponent";
import { auth } from "@/auth";
import { User } from "@/types/User";

async function AccountPage() {
  const session = await auth();
  if (!session || typeof session.user.githubUsername !== "string") {
    return notFound();
  }
  const user = await getUserByUsername(session?.user.githubUsername);
  if (!user) {
    return notFound();
  }
  return (
    <PageContainer className="gap-8">
      <UserComponent user={user} />
    </PageContainer>
  );
}

export default AccountPage;
