import { Button, Image, Space, Table, Typography, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { getOffers } from "../../API";
import { CheckSquareOutlined, CloseSquareFilled, } from "@ant-design/icons";

function Offers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOffers().then((res) => {
      setDataSource(res);
      console.log(res);
      setLoading(false);
    });
  }, []);

  const handleApprove = (id) => {
    console.log("Edit id:", id);

  }

  const handleDelete=(id)=>{

  }

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Offer</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Name (ID)",
            dataIndex: "partnerId",
          },

          {
            title: "Image",
            dataIndex: "offerImage",
            render: (image) => {
              return <Image src={image} width={200} height={140} />;
            },
          },
          {
            title: "Offer",
            dataIndex: "offer",
          },
          {
            title: "Transaction ID",
            dataIndex: "transactionId",
          },
          {
            title: "Approved",
            dataIndex: ["isApproved", "_id"],
            render: (id, data) => {
              return data.isApproved ? <Tooltip title="Disapprove Offer">
                <Button
                  type="default"
                  style={{ background: "#59c959" }}
                  icon={<CheckSquareOutlined />}
                >
                </Button>
              </Tooltip> :
                <>
                  <Tooltip title="Approve Offer">
                    <Button
                      type="default"
                      style={{ background: "red" }}
                      icon={<CloseSquareFilled />}
                      onClick={() => {
                        // Handle edit button click here
                        handleApprove(data._id)

                      }}
                    >
                    </Button>
                  </Tooltip>
                </>
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
export default Offers;