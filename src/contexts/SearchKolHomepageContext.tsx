import { ReactNode, createContext, useState } from "react";

export const SearchKolHomepageContext = createContext<{
  kolSearch: string | null;
  setKolSearch: React.Dispatch<any>;
}>({ kolSearch: null, setKolSearch: () => null });

export const SearchKolHomepageProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [kolSearch, setKolSearch] = useState<string | null>(null);
  const value = { kolSearch, setKolSearch };
  return (
    <SearchKolHomepageContext.Provider value={value}>
      {children}
    </SearchKolHomepageContext.Provider>
  );
};
