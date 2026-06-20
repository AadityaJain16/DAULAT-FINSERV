import PageContainer from "../components/common/PageContainer";
import BottomNav from "../components/investor/BottomNav";

const InvestorLayout = ({ children }) => {
  return (
    <PageContainer>
      <main
  className="
    pb-24
    px-4
    md:px-6
    lg:px-8
    min-h-screen
  "
>
        {children}
      </main>

      <BottomNav />
    </PageContainer>
  );
};

export default InvestorLayout;