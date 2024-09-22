import { toast } from "react-toastify";

export function Toaster(type, toastMessage) {
    switch (type) {
        case "error":
            return toast.error(toastMessage, {
                position: "top-right",
                className: "toast-error",
                autoClose: 3000,
                toastId: "error",
            });
        case "success":
            return toast.success(toastMessage, {
                position: "top-right",
                className: "toast-success",
                autoClose: 3000,
                toastId: "success",
            });
        default:
            return null;
    }
}