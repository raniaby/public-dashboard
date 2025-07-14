import { Suspense, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "../../hooks/useMobile";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  return (
    <div className="flex h-screen bg-gray-50/50">
      <Sidebar
        collapsed={collapsed}
        mobileDrawerOpen={mobileDrawerOpen}
        setMobileDrawerOpen={setMobileDrawerOpen}
      />

      <div
        className={`flex-1 flex flex-col min-w-0 transition-[margin] duration-300 ease-in-out ${
          isMobile ? "" : !collapsed ? "ml-60" : "ml-20"
        }`}
      >
        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isMobile={isMobile}
          setMobileDrawerOpen={setMobileDrawerOpen}
        />

        <main className="flex-1 overflow-auto p-6">
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
