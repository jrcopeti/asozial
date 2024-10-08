import { cn } from "@/lib/utils";

function ProjectPostContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-1 rounded-md border border-dashed border-zinc-300 bg-inherit py-5 pl-4 pr-6 hover:bg-zinc-200/10 dark:border-zinc-600 dark:bg-inherit dark:shadow-neutral-700/30 dark:hover:bg-zinc-700/10 lg:pb-6 lg:pl-8 lg:pr-12 lg:pt-10",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default ProjectPostContainer;
