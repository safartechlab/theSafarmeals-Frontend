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
<<<<<<< HEAD
        position: "top-center",
=======
        position: "bottom-center",
>>>>>>> 436f56ce657c5a46c478a2ba2ebdc09e6312ef8b
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
