import UserSidebar from "@/components/UserSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container flex gap-2 h-fit">
      <UserSidebar />
      {children}
    </div>
  );
};

export default Layout;
