import { Avatar, Button, Dropdown, Input, Menu, Space, Table, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { getEnquiries,deleteEnquiry } from "../../API";
import { DeleteOutlined, DownOutlined } from "@ant-design/icons";

function Enquiries() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        getEnquiries().then((res) => {
            console.log(res);
            setDataSource(res);
            setLoading(false);
        });
    }, []);

    const handleDeleteEnquiry = (id) => {
        console.log(id);
        deleteEnquiry(id).then((res => {
          console.log(res);
        }))
      }

    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Enquiries</Typography.Title>
            <Space direction="vertical">
                <Typography.Title level={2}> Search By Type</Typography.Title>
                <Space>
                    <Dropdown
                        overlay={(
                            <Menu>
                                <Menu.Item key="1">Cold</Menu.Item>
                                <Menu.Item key="2">Hot</Menu.Item>
                                <Menu.Item key="3">Warm </Menu.Item>
                            </Menu>
                        )}
                        trigger={["click"]}
                    >
                        <span>
                            Cold <DownOutlined />
                        </span>
                    </Dropdown>
                    <Input
                        placeholder="Search in Enquiries" />
                    <Button
                        type="primary"
                    >
                        Filter
                    </Button>
                </Space>
            </Space>
            <Table
                loading={loading}
                columns={[
                    {
                        title: "Customer Info",
                        dataIndex: "customerInfo",
                        render: (customer) => {
                            return <><Avatar src={customer.profileLogo ? customer.profileLogo : "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"} />
                                <p>
                                    {customer.name}
                                </p>
                                <span>
                                    ({customer.email})
                                </span>
                            </>
                        },
                    },
                    {
                        title: "Vendor Info",
                        dataIndex: "partnerInfo",
                        render: (vendor) => {
                            return <><Avatar src={vendor.profileLogo ? vendor.profileLogo : "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"} />
                                <p>
                                    {vendor.name}
                                </p>
                                <span>
                                    ({vendor.email})
                                </span>
                            </>
                        },
                    },

                    {
                        title: "Type",
                        dataIndex: "enquiry",
                        render: (id, enq) => {
                            return (
                                <span>
                                    {enq.enquiry.type}
                                </span>
                            );
                        },
                    },
                    {
                        title: "Actions",
                        dataIndex: "enquiry",
                        render: (enq) => {
                          return <Tooltip title="Delete Enquiry">
                            <Button
                              type="primary"
                              style={{ background: "red" }}
                              icon={<DeleteOutlined />}
                              onClick={() => handleDeleteEnquiry(enq._id)}
                            >
                            </Button>
                          </Tooltip>
            
                        },
                      },
                ]}
                dataSource={dataSource}
                pagination={{
                    pageSize: 5,
                }}
            ></Table>
        </Space>
    );
}
export default Enquiries;
