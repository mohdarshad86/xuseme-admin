import React, { useState } from "react";
import { Modal, Input, Form, Button, message, Tooltip, Upload } from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { postBanner } from "../../API";

const AddBanner = ({ banner }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [picLoading, setPicLoading] = useState(false);
    const [formData, setFormData] = useState({
        transactionId: "",
        partnerId: "",
        price: "",
        validity: "",
        bannerImage: null,
    });

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);

        setFormData({
            transactionId: "",
            partnerId: "",
            price: "",
            validity: "",
            bannerImage: null,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageUpload = (file) => {
        setFormData({
            ...formData,
            bannerImage: file,
        });
    };

    const beforeUpload = (file) => {

        handleImageUpload(file);
        return false;
    };

    const handleRemove = () => {
        setFormData({
            ...formData,
            bannerImage: null,
        });
    };

    const handleSubmit = async () => {
        try {
            const dataToSend = new FormData();
            dataToSend.append("price", formData.price);
            dataToSend.append("validity", formData.validity);
            dataToSend.append("transactionId", formData.transactionId);
            if (formData.bannerImage) {
                dataToSend.append("bannerImage", formData.bannerImage);
            }
            
            let user = localStorage.getItem('userInfo');
            user = JSON.parse(user)
            dataToSend.append("partnerId", user.data._id);
            
            const response = await postBanner(dataToSend);
            console.log(response);
            if (response) {
                setIsModalVisible(false);
            } else {
                console.error("Error occurred:", response.statusText);
                message.error("Error Occurred!");
                setPicLoading(false);
            }
        } catch (error) {
            console.error("Error occurred:", error);
            message.error("Error Occurred!");
            setPicLoading(false);
        }
    };

    return (
        <>
            {banner.id ? (
                <span onClick={showModal}>{banner.title}</span>
            ) : (
                <>
                    <Tooltip title="Create Banner">
                        <EditOutlined onClick={showModal} />
                    </Tooltip>
                </>
            )}
            <Modal
                title="Add Banner"
                open={isModalVisible} // Change "open" to "visible"
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleSubmit}
                        loading={picLoading}
                    >
                        Submit
                    </Button>,
                ]}
            >
                <Form>
                    <Form.Item label="Banner Price : ">
                        <Input
                            name="price"
                            placeholder={`Banner Price`}
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label="TransactionId : ">
                        <Input
                            name="transactionId"
                            placeholder={`TransactionId`}
                            value={formData.transactionId}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label="Validity : ">
                        <Input
                            name="validity"
                            placeholder={`Validity in Days`}
                            value={formData.validity}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label="Choose Picture:">
                        <Upload
                            beforeUpload={beforeUpload}
                            showUploadList={{
                                showRemoveIcon: true,
                            }}
                            fileList={formData.bannerImage ? [formData.bannerImage] : []}
                            onRemove={handleRemove}
                        >
                            {formData.bannerImage ? (
                                <Button icon={<UploadOutlined />}>Change Image</Button>
                            ) : (
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            )}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddBanner;
