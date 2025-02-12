import { PropsWithChildren } from "react";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <main className="container p-5 max-sm:pl-3 mx-auto min-h-screen">
        {children}
      </main>
      <footer>
        <p>© 2021</p>
      </footer>
    </div>
  );
};

export default Layout;
