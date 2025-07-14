import { Button, Avatar, Dropdown } from "antd";
import type { MenuProps } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useLogoutMutation } from "../../store/auth/authApi";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobile: boolean;
  setMobileDrawerOpen: (open: boolean) => void;
}

const Header = ({
  collapsed,
  setCollapsed,
  isMobile,
  setMobileDrawerOpen,
}: HeaderProps) => {
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    const refresh_token = localStorage.getItem("refresh_token");

    try {
      if (refresh_token) {
        await logout({ refresh_token });
      }
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/";
    }
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() =>
          isMobile ? setMobileDrawerOpen(true) : setCollapsed(!collapsed)
        }
        className="text-gray-600 hover:text-gray-800"
      />

      <div className="flex items-center">
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-gray-50">
            <Avatar
              size="small"
              className="bg-violet-500"
              icon={<UserOutlined />}
            />
            <span className="hidden text-sm text-gray-700 sm:inline">
              Admin User
            </span>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
