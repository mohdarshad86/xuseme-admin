import { BellFilled, MailOutlined, MenuOutlined } from "@ant-design/icons";
import { Badge, Button, Drawer, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { getComments, getNotification } from "../../API";
import { useNavigate } from "react-router-dom";

function AppHeader() {
  const [comments, setComments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getNotification().then((res) => {
      setNotifications(res.notifications);
    });
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('userInfo');
    navigate('/')
  }

  const handleMenu = () => {
    setMenuVisible(!menuVisible);
    console.log(menuVisible); // Toggle menu visibility
  }

  return (
    <div className="AppHeader">
      <MenuOutlined
      className="mobile-menu-icon"
        onClick={handleMenu}
      />
      <Typography.Title style={{ fontSize: "38px" }}>Admin Panel</Typography.Title>
      <Space>
        <Button
          type="primary"
          onClick={handleLogOut}
        >
          LogOut
        </Button>
        <Badge count={comments.length} dot>
          <MailOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge count={comments.length}>
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge>
      </Space>
      <Drawer
        title="Comments"
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>;
          }}
        ></List>
      </Drawer>
      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={notifications}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Text strong>{item.title}</Typography.Text> has been
                ordered!
              </List.Item>
            );
          }}
        ></List>
      </Drawer>
    </div>
  );
}
export default AppHeader;
