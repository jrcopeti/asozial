import SidebarFriendsRequestsTable from "./SidebarFriendsRequestsTable";
import SidebarProjectRequestsTable from "./SidebarProjectRequestsTable";
import SidebarTitle from "./SidebarTitle";

function SidebarRequests({
  user,
  project,
}: {
  user?: boolean;
  project?: boolean;
}) {
  return (
    <div className="flex w-full flex-col gap-4 font-semibold">
      {project && (
        <>
          <SidebarTitle className='ml-4'>Requests</SidebarTitle>
          <SidebarProjectRequestsTable />
        </>
      )}
      {user && (
        <>
          <SidebarTitle className="self-end mr-4">Requests</SidebarTitle>
          <SidebarFriendsRequestsTable />
        </>
      )}
    </div>
  );
}

export default SidebarRequests;
