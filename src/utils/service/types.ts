import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface BaseRequestInterceptors<T = AxiosResponse<any>> {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface BaseRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: BaseRequestInterceptors<T>
  loading?: boolean | string
  noToken?: boolean
}

// export interface AxiosInterface {
//   apiType?: string;
//   apiUrl?: string;
//   primaryColLabel?: string;
//   primaryKey?: string;

//   getTableData(urlParams?: unknown): unknown;
//   postFormData(bodyParams?: unknown, urlParams?: unknown): unknown;
//   putFormData(bodyParams?: unknown): unknown;
//   deleteRecord(ids: number[] | string[]): unknown;
//   getDataArray?<T>(urlParams?: unknown): Promise<Array<T>>;
// }
