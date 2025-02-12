import { PropsWithChildren } from "react";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="container min-h-screen p-5 mx-auto max-sm:pl-3">
        {children}
      </main>
      <footer className="p-5 text-center border-t py-7 bg-background/75">
        <p className="text-sm sm:text-lg sm:font-semibold">
          Made with Salmanulfaris 🤩
        </p>
      </footer>
    </div>
  );
};

export default Layout;
