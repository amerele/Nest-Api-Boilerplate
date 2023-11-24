/* eslint-disable @typescript-eslint/no-explicit-any */
import { IJsonResponse } from "./json-response.contract";

export const Error = (
  status: number | string,
  message: string,
  error: any,
): IJsonResponse<null> => ({
  statusCode: status,
  message: message,
  data: null,
  error,
});
