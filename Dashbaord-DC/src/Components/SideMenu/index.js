import {
  AppstoreOutlined,
  FileImageTwoTone,
  MessageTwoTone,
  OrderedListOutlined,
  PhoneTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          // item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashborad",
            key: "/dashboard",
            icon: <AppstoreOutlined />,
          },
          {
            label: "Customers",
            key: "/customers",
            icon: <UserOutlined />,
          },
          {
            label: "Vendors",
            key: "/vendors",
            icon: <UserOutlined />,
          },
          {
            label: "Category",
            key: "/categorys",
            icon: <OrderedListOutlined />,
          },
          {
            label: "Banners",
            key: "/banners",
            icon: <FileImageTwoTone />,
          },
          {
            label: "Offers",
            key: "/offers",
            icon: <FileImageTwoTone />,
          },                
          {
            label: "Enquiry",
            key: "/enquiry",
            icon: <PhoneTwoTone />,
          },                
          {
            label: "Help",
            key: "/help",
            icon: <MessageTwoTone />,
          },                
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
