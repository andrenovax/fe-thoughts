import { Api } from "./api";

export interface HTTPApi<PAYLOAD, RESPONSE, ERROR> extends Api {
  method: HTTPMethod,
  payload: PAYLOAD,
  data: RESPONSE,
  error: ERROR,
  headers?: Headers,
}

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
