import { Outlet } from "react-router-dom";
import Header from "../pages/user/header/Header";
import Footer from "../pages/user/footer/Footer";
const Endlayout = () => {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Endlayout;
