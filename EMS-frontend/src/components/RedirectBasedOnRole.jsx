import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectBasedOnRole = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else if (user?.role === "employee") {
      navigate("/employee/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return null;
};

export default RedirectBasedOnRole;
