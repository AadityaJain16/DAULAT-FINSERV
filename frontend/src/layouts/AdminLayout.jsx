import AdminSidebar from "../components/dashboard/AdminSidebar";
import PageContainer from "../components/common/PageContainer";

const AdminLayout = ({ children }) => {
  return (
    <PageContainer>
      <div className="flex min-h-screen">
        <AdminSidebar />

        <main
          className="
            flex-1
            p-4
            lg:p-8
            mt-16
            lg:mt-0
            overflow-x-hidden
          "
        >
          {children}
        </main>
      </div>
    </PageContainer>
  );
};

export default AdminLayout;