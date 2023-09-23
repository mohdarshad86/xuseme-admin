import { Button, Image, Space, Table, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCategorys } from "../../API";
import AddCategory from "../../Components/Miscellaneous/AddCategory";
import { DeleteFilled, EditOutlined, } from "@ant-design/icons";
const url = "https://xuseme.preciousresidency.com/";

function Category() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCategorys().then((res) => {
      setDataSource(res);
      console.log(res);
      setLoading(false);
    });
  }, []);

  const handleCategoryEdit = (id) => {
    console.log(id);
  }

  return (
    <Space size={20} direction="vertical">
      <Space style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between"
      }}>
        <Typography.Title level={4}>Category</Typography.Title>
        <AddCategory category={dataSource}>
          <Button
            style={{
              backgroundColor: "rgba(11, 235, 11, 0.38)",
              fontWeight: "bold",
            }}
          >
            Create Category
          </Button>
        </AddCategory >
      </Space>
      <Table
        loading={loading}
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "SubTitle",
            dataIndex: "subTitle",
            render: (id, data) => {
              return (
                <Typography.Text style={{ wordWrap:"break-word"}} >
                  {data.subTitle}
                </Typography.Text>
              );
            },
          },
          {
            title: "Image",
            dataIndex: "image",
            render: (image) => {
              return <Image src={url + image} width={200} height={140} />;
            },
          },
          {
            title: "Min Price",
            dataIndex: "minPrice",
          },
          {
            title: "Action",
            dataIndex: "_id",
            render: (id) => {
              return (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Tooltip title="Edit">
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={() => {
                        // Handle edit button click here
                        handleCategoryEdit(id)
                        // console.log("Edit id:", id);
                      }}
                    >
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <Button
                      type="default"
                      icon={<DeleteFilled />}
                      onClick={(id) => {
                        // Handle update button click here
                        console.log("Deleting id:", id);
                      }}
                    >
                    </Button>
                  </Tooltip>
                </div>
              );
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
export default Category;