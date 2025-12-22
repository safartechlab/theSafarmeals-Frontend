import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeToast } from "../slice/toast_slice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = ({ children }) => {
  const dispatch = useDispatch();
  const toaststate = useSelector((state) => state.toast);

  useEffect(() => {
    if (toaststate.message && toaststate.type) {
      toast[toaststate.type](toaststate.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          dispatch(closeToast());
        },
      });
    }
  }, [toaststate, dispatch]);

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default ToastProvider;
