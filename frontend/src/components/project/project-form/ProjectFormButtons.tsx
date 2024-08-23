import CustomDialog from "@/components/common/ui/CustomDialog";
import LoadingTextButton from "@/components/common/ui/LoadingTextButton";
import { Button } from "@/components/ui/button";

type ProjectFormButtonsProps = {
  isSubmitting: boolean;
  error: string | null;
  handleDeleteProject?: () => void;
  edit?: boolean;
};

function ProjectFormButtons({
  isSubmitting,
  error,
  handleDeleteProject,
  edit,
}: ProjectFormButtonsProps) {
  return (
    <>
      <Button
        disabled={isSubmitting}
        type="submit"
        className="mt-4 bg-dark dark:bg-light"
      >
        {isSubmitting ? (
          <LoadingTextButton text={edit ? "Updating" : "Creating"} />
        ) : edit ? (
          "Update"
        ) : (
          "Create"
        )}
      </Button>
      {error && (
        <span className="text-base font-light text-red-700 dark:text-red-700">
          {error}
        </span>
      )}
      {edit && handleDeleteProject && (
        <CustomDialog
          title="Are you sure?"
          description="There's no turning back once you delete this project"
          handler={handleDeleteProject}
          trigger={
            <Button variant={"destructive"} className="mt-2 w-full">
              Delete
            </Button>
          }
          asChild
        />
      )}
    </>
  );
}

export default ProjectFormButtons;