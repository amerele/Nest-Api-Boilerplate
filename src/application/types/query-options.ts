export class QueryOptions {
  pageIndex: number = 0;
  pageSize: number = 10;
  searchBy?: string;
  orderBy: string = 'createdAt';
  direction?: 'asc' | 'desc' = 'desc';
}


// OBS: Tente NÃO modificar estes parâmetros. Se precisar de mais parâmetro pra uma query especifica, 
// crie uma nova classe que estenda esta.