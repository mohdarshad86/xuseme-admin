import {
  FileImageOutlined,
  MessageTwoTone,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getEnquiries, } from "../../API";
import { Link } from "react-router-dom";

function Dashboard() {
  const [enquiry, setEnquiry] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [banners, setBanners] = useState(0);

  useEffect(() => {
    setBanners(4)
    getEnquiries().then((res) => {
      setEnquiry(res.length);
    });
    getCustomers().then((res) => {
      setCustomers(res.length);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="vertical">
        <Space>
          <Link to='/customers'>
            <DashboardCard
              style={{ width: '200px', margin: '10px' }}
              icon={
                <UserOutlined
                  style={{
                    color: "purple",
                    backgroundColor: "rgba(0,255,255,0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title={"Customers"}
              value={customers}
            />
          </Link>
          <Link to='/enquiry'>
            <DashboardCard
              icon={
                <PhoneOutlined
                  style={{
                    color: "blue",
                    backgroundColor: "rgba(0,0,255,0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title={"Enquiry"}
              value={enquiry}
            />
          </Link>
        </Space>
        <Space>
          <Link to='/banners'>
            <DashboardCard
              icon={
                <FileImageOutlined
                  style={{
                    color: "red",
                    backgroundColor: "rgba(255,0,0,0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title={"Banners"}
              value={banners}
            />
          </Link>
          <Link to='/help'>
            <DashboardCard
              icon={
                <MessageTwoTone
                  style={{
                    color: "red",
                    backgroundColor: "rgba(255,0,0,0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title={"Complaints"}
              value={banners}
            />
          </Link>
        </Space>
      </Space>
      <Space>
        <Recentenquiry />
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card style={{ display: "flex" }}>

      {/* <Button ghost borderColor="none"> */}
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
      {/* </Button> */}
    </Card>
  );
}
function Recentenquiry() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getEnquiries().then((res) => {
      console.log(res);
      setDataSource(res.splice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Typography.Text>Recent Enqueries</Typography.Text>
      <Table
        columns={[
          {
            title: "Customer Name",
            dataIndex: "customerInfo",
            render: (info) => {
              return <p >{info.name}</p>
            },
          },
          {
            title: "Vendor Name",
            dataIndex: "partnerInfo",
            render: (info) => {
              return <p >{info.name}</p>
            },
          },
          {
            title: "Type",
            dataIndex: "enquiry",
            render: (info) => {
              return <p >{info.type}</p>
            },
          },

        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}

export default Dashboard;
