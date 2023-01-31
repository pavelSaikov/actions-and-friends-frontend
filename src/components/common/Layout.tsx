export const Layout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <div className="flex flex-col justify-between p-[6rem] min-h-[100vh]">
      {children}
    </div>
  );
};
