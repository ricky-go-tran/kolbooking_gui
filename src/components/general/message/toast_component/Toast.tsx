import { ToastComponentType } from "../../../../global_variable/global_component_type";
import { useContext } from "react";
import { ToastContext } from "../../../../contexts/ToastContext";

const Toast = ({ toast }: { toast: ToastComponentType }) => {
  const { dispatch: toast_dispatch } = useContext(ToastContext);

  return (
    <div
      id="alert-border-1"
      className={`flex items-center p-4 mb-4 text-${toast.color}-800 border-t-4 border-${toast.color}-300 bg-${toast.color}-50 dark:text-${toast.color}-400 dark:bg-gray-800 dark:border-${toast.color}-800 w-7/12`}
      role="alert"
    >
      <svg
        className="flex-shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div className="ml-3 text-sm font-medium">
        <span className="font-semibold mr-3">{toast.title}!</span>
        {toast.message}
      </div>
      <button
        type="button"
        className={`ml-auto -mx-1.5 -my-1.5 bg-${toast.color}-50 text-${toast.color}-500 rounded-lg focus:ring-2 focus:ring-${toast.color}-400 p-1.5 hover:bg-${toast.color}-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-${toast.color}-400 dark:hover:bg-gray-700`}
        data-dismiss-target="#alert-border-1"
        aria-label="Close"
        onClick={() => {
          toast_dispatch({ type: "CLOSE", payload: toast });
        }}
      >
        <span className="sr-only">Dismiss</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
