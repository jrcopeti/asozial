import DashboardContainer from "@/components/dashboard/DashboardContainer";
import ProjectContainer from "@/components/project/ProjectContainer";
import UserContainer from "@/components/user/UserContainer";

function Page() {
  return (
    <>
      <UserContainer />
      <DashboardContainer />
      <ProjectContainer />
    </>
  );
}

export default Page;
