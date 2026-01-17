import { toast } from 'vue3-toastify'

const options = {
  position: 'top-right',
  autoClose: 3000,
  pauseOnHover: true,
  closeOnClick: true,
}

export const successToast = (msg) => toast.success(msg, options)
export const errorToast = (msg) => toast.error(msg, options)
export const warningToast = (msg) => toast.warning(msg, options)