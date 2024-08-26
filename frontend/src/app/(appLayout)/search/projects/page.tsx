//Components
import PageContainer from "@/components/common/containers/PageContainer";
import SearchProjects from "@/components/project/SearchProjects";
import PageTitle from "@/components/common/ui/PageTitle";
import ProjectTabs from "@/components/project/ProjectTabs";
import {
  searchForProjects,
  searchForProjectsThatUserIsMember,
  searchForUserProjects,
} from "@/actions";

type ProjectsPageProps = {
  searchParams: {
    query?: string;
    page?: string;
  };
};

async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const query = searchParams.query || "";
  const currentPage = Number(searchParams.page) || 1;
  const limit = 12;

  const [projects, ownerProjects, memberProjects] = await Promise.all([
    searchForProjects(query, currentPage, limit),
    searchForUserProjects(query, currentPage, limit),
    searchForProjectsThatUserIsMember(query, currentPage, limit),
  ]);

  return (
    <PageContainer className="gap-10 2xl:max-w-screen-xl">
      <section className="flex w-full flex-col items-center gap-8">
        <PageTitle className="text-3xl">Explore Projects</PageTitle>
        <SearchProjects />
      </section>
      <ProjectTabs
        projects={projects.projects}
        totalPages={projects.totalPages}
        ownerProjects={ownerProjects.projects}
        ownerTotalPages={ownerProjects.totalPages}
        memberProjects={memberProjects.projects}
        memberTotalPages={memberProjects.totalPages}
        currentPage={currentPage}
        query={query}
      />
    </PageContainer>
  );
}

export default ProjectsPage;