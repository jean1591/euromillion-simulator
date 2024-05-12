export const Panel = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen">
      <div className="border border-dark-shade/25 bg-light-shade py-10 px-5 rounded-md overflow-y-scroll h-4/5">
        {children}
      </div>
    </div>
  );
};
