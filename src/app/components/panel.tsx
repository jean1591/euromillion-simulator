export const Panel = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border border-dark-shade/25 bg-light-shade py-10 px-5 rounded-md">
      {children}
    </div>
  );
};
