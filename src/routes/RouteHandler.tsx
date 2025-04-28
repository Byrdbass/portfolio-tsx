import { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import CodeProjectsMobile from "../pages/mobile/mobileCodeProjects/CodeProjectsMobile";
import DesktopHomePage from "../pages/desktop/home/DesktopHomePage";
import DesktopHomePage2 from "../components/examples/DesktopHomePage2/DesktopHomePage2";

function RouteHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const isDesktopRoute = location.pathname === "/desktop";
  //   const urlParam = new URLSearchParams(location.search).get("mode");

  //   if (isDesktopRoute && urlParam !== "desktop") {
  //     navigate("/mobile", { replace: true });
  //   }
  // }, [location, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/mobile" replace />} />
      <Route path="/mobile" element={<CodeProjectsMobile />}></Route>
      <Route path="/desktop" element={<DesktopHomePage />}></Route>
    </Routes>
  );
}

export default RouteHandler;
