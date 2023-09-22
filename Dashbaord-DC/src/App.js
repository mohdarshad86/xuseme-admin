import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import SideMenu from "./Components/SideMenu";
import AppRoutes from "./Components/AppRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" />
        <Route path="/*" element={<AppHeader />} />
      </Routes>
      <div className="SideMenuAndPageContent">
        <Routes>
          <Route path="/" />
          <Route path="/*" element={<SideMenu />} />
        </Routes>
        <AppRoutes />
      </div>
      <Routes>
        <Route path="/" />
        <Route path="/*" element={<AppFooter />} />
      </Routes>

    </div>
  );
}
export default App;
