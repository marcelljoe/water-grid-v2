export interface IDataMenu {
  id: number;
  header: number;
  menu: string;
  path: string;
  level: number;
  icon: string | null;
  sort: number;
  status: number;
  child: IDataMenu[];
}
