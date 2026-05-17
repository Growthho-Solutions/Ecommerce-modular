export const toast = {
  success: (msg: string) => console.log("Success:", msg),
  error: (msg: string) => console.error("Error:", msg),
  info: (msg: string) => console.log("Info:", msg),
  warning: (msg: string) => console.warn("Warning:", msg),
  promise: <T>(promise: Promise<T>, options: { loading?: string, success?: string | ((data: T) => string), error?: string | ((error: any) => string) }) => {
    if (options.loading) console.log(options.loading);
    return promise
      .then((data) => {
        if (options.success) {
          console.log(typeof options.success === "function" ? options.success(data) : options.success);
        }
        return data;
      })
      .catch((err) => {
        if (options.error) {
          console.error(typeof options.error === "function" ? options.error(err) : options.error);
        }
        throw err;
      });
  },
  custom: (jsx: any) => console.log("Custom toast:", jsx),
  dismiss: (id?: string | number) => console.log("Dismiss toast:", id),
};
