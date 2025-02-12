import { PropsWithChildren, useState } from "react";
import { createContext } from "react";

export interface UserDetails {
  name: string;
  phoneNumber: string;
}
interface NameContextProps {
  user: UserDetails;
  setUser: (user: UserDetails) => void;
}
const nameContext = createContext<NameContextProps | undefined>(undefined);
const NameContext = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserDetails>({
    name: "",
    phoneNumber: "",
  });
  return (
    <nameContext.Provider value={{ user, setUser }}>
      {children}
    </nameContext.Provider>
  );
};

export default NameContext;
