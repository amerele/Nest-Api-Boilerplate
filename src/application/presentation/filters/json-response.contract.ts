export interface IJsonResponse<T> {
  statusCode: number | string;
  message: string;
  data: T | null;
}

export class IPaginated<T> {
  data: T[];
  total: number;
}

export class Pagination {
  constructor(
    public readonly data: any[],
    public readonly total: number,
  ) {
    this.data = data;
    this.total = total;
  }
}

export type JsonResponse<PNameOrData, T = undefined> = {
  statusCode: number | string;
  message: string;
  data: (PNameOrData extends string ? { [P in PNameOrData]: T } : never) | null;
  error: unknown | unknown[] | null;
};
