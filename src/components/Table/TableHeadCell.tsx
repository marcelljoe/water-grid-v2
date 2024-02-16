import React, { FC, useContext } from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { IHeadCell } from './Table.types';
import { StoreContext } from '@/context/context';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import theme from '@/styles/theme';

interface TableHeadCellProps {
  headCell: IHeadCell;
}

const TableHeadCell: FC<TableHeadCellProps> = (props: TableHeadCellProps) => {
  const { state, actions } = useContext(StoreContext);
  const headCell = props.headCell;

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
    const isAsc = state.filter.column === property && (state.filter.direction === 'asc' || !state.filter.direction);
    actions

      // UPDATE_PAGINATION({
      //   ...state.pagination,
      //   orderBy: property,
      //   sort: state.pagination.sort === 'desc' ? 'asc' : 'desc'
      // });
      .UPDATE_FILTER({
        ...state.filter,
        column: property,
        direction: isAsc ? 'desc' : 'asc'
      });
  };

  return (
    <TableCell
      key={headCell.id + headCell.label}
      align={headCell.numeric ? 'center' : 'left'}
      padding={headCell.disablePadding ? 'none' : 'normal'}
      sortDirection={state.filter.column === headCell.id ? state.filter.direction || undefined : false}
      style={{ color: theme.palette.text.secondary, fontWeight: 700 }}
    >
      {headCell && (
        <TableSortLabel
          active={state.filter.column === headCell.id}
          direction={state.filter.column === headCell.id ? state.filter.direction || undefined : 'asc'}
          onClick={e => handleRequestSort(e, headCell.id)}
          key={headCell.id + headCell.label}
        >
          {headCell.label}
          {state.filter.column === headCell.id && (
            <Box component="span" sx={visuallyHidden} key={headCell.id + headCell.label}>
              {state.filter.direction === 'desc' ? 'sorted descending' : 'sorted ascending'}
            </Box>
          )}
        </TableSortLabel>
      )}
    </TableCell>
  );
};

export default React.memo(TableHeadCell);
