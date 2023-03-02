import type { AbstractModel } from './AbstractModel'

export enum ApiRequestType {
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

export enum ApiFilterType {
  EQ = 'EQ',
  NEQ = 'NEQ',
  LIKE = 'LIKE',
  SAMEORBEFORE = 'SAMEORBEFORE',
  BEFORE = 'BEFORE',
  SAMEORAFTER = 'SAMEORAFTER',
  AFTER = 'AFTER',
  IN = 'IN',
  MEMBEROF = 'MEMBEROF',
  ISNULL = 'ISNULL',
  ISNOTNULL = 'ISNOTNULL',
}

// Response Create/Read/Update (Base Response)
export interface ApiResponseMeta {
  readonly accessGranted?: boolean
  readonly meta: Record<string, ApiResponseMeta>
}

export interface ApiResponse<T extends AbstractModel> {
  data: T
  meta: ApiResponseMeta
}

// Response Query
export interface ApiQueryResponseMeta extends ApiResponseMeta {
  readonly currentLimit: number
  readonly currentPage: number
  readonly currentPageSize: number
  readonly totalCount: number
}

export interface ApiQueryResponse<T extends AbstractModel> {
  data: T[]
  meta: ApiQueryResponseMeta
}

// Request
export interface ApiResponseFilterGeneric {
  [key: string]: boolean | ApiResponseFilterGeneric
}

export interface ApiResponseFilterModel {
  field: string
  response: Partial<Array<string | ApiResponseFilterModel>>
}

// export type ApiResponseFilter<T> = Partial<Record<keyof T | '*' | '+', boolean | ApiResponseFilterGeneric>>
export type ApiResponseFilter<T> = Partial<Array<keyof T | '*' | '+' | ApiResponseFilterModel>>

// Request Read
export interface ApiReadRequest<T extends AbstractModel> {
  '@type'?: string
  response: ApiResponseFilter<T>
}

// Request Create/Update
export interface ApiSaveRequest<T extends AbstractModel> extends ApiReadRequest<T> {
  data: T
}

// Query
export interface ApiFilter {
  param: string
  key: ApiFilterType
  value?: string
}

export interface ApiLogic {
  type: string
  filter: ApiFilter[]
  group?: ApiLogic[]
}

export interface ApiQueryParameter {
  limit?: number
  page?: number
  query?: ApiLogic
  order?: Array<Record<string, string>>
  [key: string]: ApiQueryParameter | any
}

export interface ApiQueryRequest<T extends AbstractModel> {
  parameter: ApiQueryParameter
  '@type'?: string
  response: ApiResponseFilter<T>
}
