import { Button, Image, Space, Table, Typography, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { getHelpSupport } from "../../API";
import { DeleteOutlined } from "@ant-design/icons";

function HelpSupport() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        getHelpSupport().then((res) => {
            // setDataSource(res.data);
            console.log(res);
            setLoading(false);
        });
    }, []);

    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Issues</Typography.Title>
            <Table
                loading={loading}
                columns={[
                    {
                        title: "Issue",
                        dataIndex: "partnerId",
                    },
                    {
                        title: "Actions",
                        dataIndex: "isApproved",
                        render:  <Tooltip title="Disapprove Banner">
                            <Button
                              type="primary"
                              style={{background:"green"}}
                              icon={<DeleteOutlined />}
                            >
                            </Button>
                          </Tooltip> 
                           
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
export default HelpSupport;