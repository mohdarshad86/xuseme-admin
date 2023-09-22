const url = "https://xuseme.preciousresidency.com";

let user = localStorage.getItem('userInfo');
user = JSON.parse(user)

const config = {
  headers: {
    Authorization: `Bearer ${user?.token}`,
  },
};

//orders
export const getOrders = () => {
  return fetch("http://localhost:7303/api/cart").then((res) => res.json());
};

//revenue
export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

//products
export const getProduct = () => {
  return fetch("http://localhost:7303/api/products").then((res) => res.json());
};
export const postProduct = (data) => {
  console.log("data", data);
  return fetch("http://localhost:7303/api/products", { method: 'POST', body: data }).then((res) => res.json());
}

//customer
export const getCustomers = () => {
  return fetch(`${url}/api/user/`, config).then((res) => res.json());
};

//vendors
export const getVendors = () => {
  return fetch(`${url}/api/user/partner/v1`, config).then((res) => res.json());
};

//comments
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};

//offers
export const getOffers = () => {
  return fetch(`${url}/api/ads/offer/`, config).then((res) => res.json());
};

//banners
export const getBanners = () => {
  return fetch(`${url}/api/ads/banner/`, config).then((res) => res.json());
};
export const postBanner = (data) => {
  console.log("data", data);
  return fetch(`${url}/api/ads/banner/self/`, { method: 'POST', ...config, body: data }).then((res) => res.json());
}
export const deleteBanner = (id) => {
  return fetch(`${url}/api/ads/banner/${id}`, { method: 'DELETE', ...config}).then((res) => res.json());
}

//category
export const getCategorys = () => {
  return fetch(`${url}/api/category/`, config).then((res) => res.json());
};
export const postCategory = (data) => {
  console.log("data", data);
  return fetch(`${url}/api/category`, { method: 'POST', ...config, body: data }).then((res) => res.json());
}

export const deleteCategory = (data) => {
  console.log("data", data);
  return fetch("http://localhost:7303/api/category", { method: 'POST', body: data }).then((res) => res.json());
}

//enquiry
export const getEnquiries = () => {
  return fetch(`${url}/api/enquiry`, config).then((res) => res.json());
};
export const deleteEnquiry = (id) => {
  // console.log(id);
  return fetch(`${url}/api/enquiry/${id}`, { method: 'DELETE', ...config}).then((res) => res.json());
}
export const getHelpSupport = () => {
  return fetch(`${url}/api/enquiry/help`, config).then((res) => res.json());
};

export const sendOTP = () => {
  return fetch("http://localhost:7303/api/LOGIN", { method: 'POST' }).then((res) => res.json());
};
