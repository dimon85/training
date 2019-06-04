import { toast } from 'react-toastify';

const OPTIONS = {
  position: toast.POSITION.BOTTOM_RIGHT,
  hideProgressBar: true,
  autoClose: 3000,
};

/**
 * Show error message
 * @param {string}  message error text
 */
export const showError = (message) => {
  toast.error(message, OPTIONS);
};

/**
 * Show warning message
 * @param {string} message
 */
export const showWarning = message => toast.warn(message, OPTIONS);

/**
 * Show success message
 * @param {string} message
 */
export const showMessage = message => toast.success(message, OPTIONS);