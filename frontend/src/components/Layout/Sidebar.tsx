import { Menu, Drawer, Layout } from "antd";
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "../../hooks/useMobile";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  mobileDrawerOpen: boolean;
  setMobileDrawerOpen: (open: boolean) => void;
}

const Sidebar = ({
  collapsed,
  mobileDrawerOpen,
  setMobileDrawerOpen,
}: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const menuItems = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: "/users",
      icon: <UserOutlined />,
      label: <Link to="/users">Users</Link>,
    },
  ];

  const renderSidebarContent = () => (
    <div className="flex flex-col gap-6">
      {!isMobile && (
        <div className="h-16 bg-white border-b border-gray-100 flex items-center px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center">
              <DashboardOutlined className="text-sm text-white" />
            </div>
            {!collapsed && (
              <span className="text-gray-900 font-semibold">Dashboard</span>
            )}
          </div>
        </div>
      )}

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="border-none"
        style={{
          background: "transparent",
          borderInlineEnd: "0px",
        }}
        onClick={() => isMobile && setMobileDrawerOpen(false)}
      />
    </div>
  );

  if (isMobile) {
    return (
      <Drawer
        placement="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        width={240}
        className="bg-white"
        closable={true}
        maskClosable={true}
      >
        {renderSidebarContent()}
      </Drawer>
    );
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="bg-white fixed h-screen z-20 shadow-sm transition-all duration-300"
      width={240}
      collapsedWidth={80}
    >
      {renderSidebarContent()}
    </Sider>
  );
};

export default Sidebar;
