import React, { useState } from "react";
import { Modal, Input, Form, Button, Upload, message, Tooltip } from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { postProduct } from "../../API";


const EditProduct = ({ product }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    cat_id: "",
    product_id: "",
    title: "",
    unit: "",
    price: "",
    old_price: "",
    offer: "",
    rating: "",
    rating_count: "",
    images: null,
  });
  const [picLoading, setPicLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);

    setFormData({
      cat_id: "",
      product_id: "",
      title: "",
      unit: "",
      price: "",
      old_price: "",
      offer: "",
      rating: "",
      rating_count: "",
      images: null,
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
      images: file,
    });
  };

  const beforeUpload = (file) => {
    handleImageUpload(file);
    return false;
  };

  const handleRemove = () => {
    setFormData({
      ...formData,
      images: null,
    });
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          dataToSend.append(key, formData[key]);
        }
      }

      const response = await postProduct(dataToSend);

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
      {product.id ? (
        <span onClick={showModal}>{product.title}</span>
      ) : (
        <>
          <Tooltip title="Create Product">
            <EditOutlined onClick={showModal} />
          </Tooltip>
        </>
      )}
      <Modal
        title="Add Product"
        open={isModalVisible}
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
          <Form.Item label="Category ID : ">
            <Input
              name="cat_id"
              placeholder={`Category ID`}
              value={formData.cat_id}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Product ID : ">
            <Input
              name="product_id"
              placeholder={`Product ID`}
              value={formData.product_id}
              onChange={handleChange}
            />
          </Form.Item>
        
          <Form.Item label="Product Title : ">
            <Input
            name="title"
              placeholder={`Product Title`}
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Unit : ">
            <Input
              name="unit"
              placeholder={`Unit`}
              value={formData.unit}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Price : ">
            <Input
              name="price"
              placeholder={`Price`}
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Old Price : ">
            <Input
              name="old_price"
              placeholder={`Old Price`}
              value={formData.old_price}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Offer : ">
            <Input
              name="offer"
              placeholder={`Offer`}
              value={formData.offer}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Rating : ">
            <Input
              name="rating"
              placeholder={`Rating`}
              value={formData.rating}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Rating Count: ">
            <Input
              name="rating_count"
              placeholder={`Rating Count`}
              value={formData.rating_count}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Choose Picture:">
            <Upload
              beforeUpload={beforeUpload}
              showUploadList={{
                showRemoveIcon: true,
              }}
              fileList={formData.images ? [formData.images] : []}
              onRemove={handleRemove}
            >
              {formData.images ? (
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

export default EditProduct;