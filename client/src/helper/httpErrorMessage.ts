export const httpErrorMessage: { [key: number]: string } = {
  400: "Please check the sent data",
  401: "Session expired. Please login again",
  403: "You don't have credentials to access data",
  404: "Not found",
  422: "Error validation",
  500: "An error occurred in the server, please contact customer service",
  502: "Gateway error. ",
  503: "The service is unavailable, the server is temporarily overloaded or maintained. ",
  504: "The gateway has timed out. ",
};
