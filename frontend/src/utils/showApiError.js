import { toast } from "react-toastify";

export const showApiError = (err) => {
  const message =
    err?.response?.data?.message ||
    err?.message ||
    "Something went wrong";

  toast.error(message);
};