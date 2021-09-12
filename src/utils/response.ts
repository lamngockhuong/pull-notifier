export const ok = (data: any, message: string = null) => ({
  success: true,
  data,
  message,
});

export const error = (errors: any, message: string = null) => ({
  success: false,
  errors,
  message,
});
