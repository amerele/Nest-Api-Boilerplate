export interface IJsonResponse<T> {
  statusCode: number | string;
  message: string;
  data: T | null;
  error: unknown | unknown[] | null;
}

export type JsonResponse<PNameOrData, T = undefined> = {
  statusCode: number | string;
  message: string;
  data:
    | (PNameOrData extends string ? { [P in PNameOrData]: T } : never)
    | null;
  error: unknown | unknown[] | null;
};
