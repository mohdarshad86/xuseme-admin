import { Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Customers";
import Dashboard from "../../Pages/Dashbaord";
import Banner from "../../Pages/Banners";
import Category from "../../Pages/Category";
import Login from "../../Pages/Login";
import Offers from "../../Pages/Offers";
import Enquiries from "../../Pages/Enquiry";
import HelpSupport from "../../Pages/HelpSupport";
import Vendors from "../../Pages/Vendors";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/customers" element={<Customers />}/>
      <Route path="/vendors" element={<Vendors />}/>
      <Route path="/banners" element={<Banner />}/>
      <Route path="/offers" element={<Offers />}/>
      <Route path="/categorys" element={<Category />}/>
      <Route path="/enquiry" element={<Enquiries />}/>
      <Route path="/help" element={<HelpSupport />}/>
    </Routes>
  );
}
export default AppRoutes;
