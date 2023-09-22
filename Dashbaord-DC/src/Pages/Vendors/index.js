import { Avatar, Button, Dropdown, Input, Menu, Space, Table, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { getVendors } from "../../API";
import { CheckSquareOutlined, CloseCircleFilled, DownOutlined } from "@ant-design/icons";

function Vendors() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        getVendors().then((res) => {
            console.log(res);
            setDataSource(res);
            setLoading(false);
        });
    }, []);

    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Vendors</Typography.Title>
            <Space direction="vertical">
                <Typography.Title level={2}> Search By Name</Typography.Title>
                <Space>
                    <Dropdown
                        overlay={(
                            <Menu>
                                <Menu.Item key="1">Name</Menu.Item>
                                <Menu.Item key="2">Email</Menu.Item>
                                <Menu.Item key="3">Reg_id </Menu.Item>
                                <Menu.Item key="4">Pincode</Menu.Item>
                                <Menu.Item key="5">City</Menu.Item>
                            </Menu>
                        )}
                        trigger={["click"]}
                    >
                        <span>
                            Name <DownOutlined />
                        </span>
                    </Dropdown>
                    <Input
                        placeholder="Search in Vendors" />
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
                        title: "Photo",
                        dataIndex: "profileLogo",
                        render: (link) => {
                            return <Avatar src={link ? link : "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"} />;
                        },
                    },
                    {
                        title: "Name",
                        dataIndex: "name",
                    },
                    {
                        title: "Shop Name",
                        dataIndex: "shopName",
                    },
                    {
                        title: "Services",
                        dataIndex: "services",
                    },
                    {
                        title: "Phone",
                        dataIndex: "mobile",
                    },

                    //   {
                    //     title: "Address",
                    //     dataIndex: ['state', 'area', 'name', 'shopType'],
                    //     render: (id, address) => {
                    //       return (
                    //         <span>
                    //           {address.name}({address.shopType}), {address.area}, {address.state}
                    //         </span>
                    //       );
                    //     },
                    //   },
                    //   {
                    //     title: "Landmark",
                    //     dataIndex: "landmark",
                    //   },
                    {
                        title: "State",
                        dataIndex: "state",
                    },
                    {
                        title: "Premium",
                        dataIndex: "isPremium",
                        render: (isPrem) => {
                            return isPrem ? <Tooltip title="Remove Premium">
                                <Button
                                    type="default"
                                    style={{ background: "#59c959" }}
                                    icon={<CheckSquareOutlined />}
                                >
                                </Button>
                            </Tooltip> :
                                <>
                                    <Tooltip title="Make Premium">
                                        <Button
                                            type="default"
                                            style={{ background: "red" }}
                                            icon={<CloseCircleFilled />}
                                        >
                                        </Button>
                                    </Tooltip>
                                </>
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
export default Vendors;