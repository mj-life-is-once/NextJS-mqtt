import { createContext, useState, ReactNode, useContext } from "react";

const FocusContext = createContext<any>(null);

export const FocusProvider = ({ children }: { children: ReactNode }) => {
  const [focus, setFocus] = useState<any>(null);

  return (
    <FocusContext.Provider value={{ focus, setFocus }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  return useContext(FocusContext);
};
