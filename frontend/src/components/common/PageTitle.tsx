function PageTitle({ children }: { children: string }) {
  return (
    <h1 className="text-3xl font-bold text-dark dark:text-light">{children}</h1>
  );
}

export default PageTitle;