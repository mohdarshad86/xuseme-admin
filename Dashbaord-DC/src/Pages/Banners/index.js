import { Button, Image, Space, Table, Typography, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { getBanners, deleteBanner } from "../../API";
import { CheckSquareFilled, CloseSquareFilled, DeleteColumnOutlined, DeleteOutlined } from "@ant-design/icons";
import AddBanner from "../../Components/Miscellaneous/AddBanner";
const url = "https://xuseme.preciousresidency.com/";

function Banner() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getBanners().then((res) => {
      setDataSource(res);
      console.log(res);
      setLoading(false);
    });
  }, []);

  const handleDeleteBanner = (id) => {
    deleteBanner(id).then((res => {
      console.log(res);
    }))
  }

  return (
    <Space size={20} direction="vertical">
      <Space style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between"
      }}>
        <Typography.Title level={4}>Banner</Typography.Title>
        <AddBanner banner={dataSource}>
          <Button
            style={{
              backgroundColor: "rgba(11, 235, 11, 0.38)",
              fontWeight: "bold",
            }}
          >
            Create Banner
          </Button>
        </AddBanner >
      </Space>

      <Table
        loading={loading}
        columns={[
          {
            title: "Name (ID)",
            dataIndex: "partnerId",
          },

          {
            title: "Image",
            dataIndex: "bannerImage",
            render: (image) => {
              return <Image src={url + image} width={200} height={140} />;
            },
          },
          {
            title: "Price",
            dataIndex: "price",
          },
          {
            title: "Transaction ID",
            dataIndex: "transactionId",
          },
          {
            title: "Validity",
            dataIndex: "validity",
          },
          {
            title: "Approved",
            dataIndex: "isApproved",
            render: (isApp) => {
              return isApp ? <Tooltip title="Disapprove Banner">
                <Button
                  type="primary"
                  style={{ background: "green" }}
                  icon={<CloseSquareFilled />}
                >
                </Button>
              </Tooltip> :
                <>
                  <Tooltip title="Approve Banner">
                    <Button
                      type="primary"
                      style={{ background: "red" }}
                      icon={<CheckSquareFilled />}
                    >
                    </Button>
                  </Tooltip>
                </>
            },
          },
          {
            title: "Actions",
            dataIndex: "_id",
            render: (id) => {
              return <Tooltip title="Delete Banner">
                <Button
                  type="primary"
                  style={{ background: "red" }}
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteBanner(id)}
                >
                </Button>
              </Tooltip>

            },
          },

        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 3,
        }}
      ></Table>
    </Space>
  );
}
export default Banner;