import { createContext, PropsWithChildren, useContext, useState } from "react";

interface UserContextType {
  user: string | null;
  setUser: (user: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<string | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
