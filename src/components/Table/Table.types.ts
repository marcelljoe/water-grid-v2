import { ReactNode } from 'react';

export interface IHeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

export interface TableWrapperProps {
  children?: ReactNode;
  title: string;
  totalData: number | undefined;
  headCell: readonly IHeadCell[];
  tableData: any;
  loading?: boolean;
  action?: (props: any) => React.JSX.Element;
}

export interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}
