export const apiResponse = ({
  statusCode = 200,
  data = null,
  message = "Success",
}) => {
  return {
    success: statusCode < 400,
    statusCode,
    data,
    message,
  };
};

export default apiResponse;