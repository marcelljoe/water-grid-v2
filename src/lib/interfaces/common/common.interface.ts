// define validate string type
export type TValidateString = 'char' | 'numeric' | 'emoji' | 'encode' | 'decode';

// define validate time type
export type TValidateTime =
  | 'date'
  | 'date-time-1'
  | 'date-time-2'
  | 'date-time-3'
  | 'date-time-4'
  | 'date-start'
  | 'date-end'
  | 'date-add'
  | 'date-subs'
  | 'date-time-add'
  | 'date-time-subs';

// define validate random char type
export type TValidateRandomChar = 'alpha' | 'numeric' | 'alphanumeric';

// define pagination interface
export interface IPagination {
  pagination?: string;
  count?: number;
  countPage?: number;
  totalPage?: number;
  rowPerPage: number;
  currentPage: number;
  limit: number;
  sort?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}

export interface IFilter {
  key: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  direction: 'asc' | 'desc' | '';
  column: string;
  statusLetter?: string;
}

// define pagination filter interface
export interface IPaginationFilter {
  startDate?: string;
  endDate?: string;
  column: string;
}

export interface ISession {
  session: string;
  maxAge?: number;
}

export interface IApiErrorResponse {
  statusCode: string;
  message: string;
}

export interface formModal {
  description: string;
  path: string;
  status: string | undefined;
  id?: string;
}

export interface IInsert extends formModal {
  header: string;
  level: string;
  icon: string | null;
  sort: string;
  sub: string;
  userId: number;
}
