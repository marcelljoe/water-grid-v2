import { FC, ChangeEvent, useContext } from 'react';
import {
  TablePagination,
  Paper,
  Table,
  Box,
  IconButton,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TextField,
  Divider,
  Chip,
  Stack,
  InputAdornment,
  TableContainer
} from '@mui/material';
import { StoreContext } from '@/context/context';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import TableHeadCell from './TableHeadCell';
import React from 'react';
import { TableWrapperProps, TablePaginationActionsProps } from './Table.types';
import SearchIcon from '@mui/icons-material/Search';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

const getStatusRead = (is_read: string | number): JSX.Element => {
  let iconColor: string = '#A5AEBB';
  let backgroundColor: string = '#F8F9FD';

  switch (true) {
    case is_read == 1:
      iconColor = '#57D697';
      backgroundColor = '#EEFBF5';
      break;
    case is_read == 0:
      iconColor = 'A5AEBB';
      backgroundColor = '#F8F9FD';
      break;
    default:
      iconColor;
      backgroundColor;
  }

  return (
    <IconButton disabled style={{ backgroundColor }}>
      <DoneAllOutlinedIcon style={{ color: iconColor }} />
    </IconButton>
  );
};

const getStatusLabel = (programStatus: string | number): JSX.Element => {
  let text: string = '';
  let color: any = 'primary';

  switch (true) {
    case programStatus == 0:
      text = 'Non Active';
      color = 'error';
      break;
    case programStatus == 1:
      text = 'Active';
      color = 'success';
      break;
    default:
      text;
      color;
  }

  return <Chip label={text} color={color} className="chip-table" variant="outlined" />;
};

const getSuratLabel = (mailStatus: string | number): JSX.Element => {
  let text: any = '';
  let color: any = 'error';

  switch (true) {
    case mailStatus == 0:
      text = 'Draft';
      color = '#A4ADBA';
      break;
    case mailStatus == 1:
      text = 'Surat Langsung';
      color = '#3F3E55';
      break;
    case mailStatus == 2:
      text = 'Paraf';
      color = '#21C0FA';
      break;
    case mailStatus == 3:
      text = 'Disetujui';
      color = '#1579FB';
      break;
    case mailStatus == 4:
      text = 'Dikirim';
      color = '#0F46A3';
      break;
    default:
      text;
      color;
  }

  return (
    <Chip
      label={text}
      style={{
        fontSize: '10px',
        color: 'white',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '32px',
        lineHeight: '25px',
        margin: '2px 10px',
        minWidth: '40px',
        width: '120px',
        backgroundColor: color
      }}
    />
  );
};

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

const TableWrapper: FC<TableWrapperProps> = (props: TableWrapperProps) => {
  const { state, actions } = useContext(StoreContext);

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    actions.UPDATE_PAGINATION({
      ...state.pagination,
      rowPerPage: +event.target.value,
      currentPage: 0
    });
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    actions.UPDATE_PAGINATION({
      ...state.pagination,
      currentPage: newPage
    });
  };

  const handleSearch = (event: any) => {
    if (event.key == 'Enter') {
      actions.UPDATE_FILTER({
        ...state.filter,
        key: event.target.value
      });
      actions.UPDATE_PAGINATION({
        ...state.pagination,
        currentPage: 0
      });
    }
  };

  const renderAction = (item: any) => {
    if (props.action) {
      return props.action(item);
    }

    return <></>;
  };

  return (
    <>
      <Paper
        sx={{
          marginTop: '30px',
          borderRadius: '0.875rem',
          backgroundColor: '#FFF'
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" style={{ padding: '0px 30px' }}>
          <h5 className="card-title">Table List</h5>
          <Box>
            <TextField
              id="outlined-basic"
              // label="Kolom Pencarian"
              variant="filled"
              type="search"
              // value={searchTerm}
              // onChange={filter}
              // onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              className="card-search-input"
              placeholder="Kolom Pencarian"
              size="medium"
              inputProps={{
                sx: {
                  whiteSpace: 'nowrap',
                  maxWidth: 'calc(100%-0px)',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  fontSize: '14px',
                  fontWeight: '500',
                  padding: '0 20px 0 0',
                  height: 45,
                  color: '#536580',

                  '&::placeholder': {
                    color: '#536580'
                  },

                  '&[type=number]': {
                    MozAppearance: 'textfield'
                  },

                  '&::-webkit-outer-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0
                  },
                  '&::-webkit-inner-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment style={{ marginTop: 0 }} position="start">
                    <SearchIcon sx={{ color: '#536580' }} />
                  </InputAdornment>
                ),
                sx: {
                  // minWidth: 140,
                  whiteSpace: 'nowrap',
                  maxWidth: 'calc(100% - 0px)',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  background: '#F8F9FD',
                  borderRadius: '8px',
                  border: '1px solid #EFF1F4',
                  '&.MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: '1px solid #EFF1F4'
                    },
                    '&:hover fieldset': {
                      border: '1px solid #536580'
                    },
                    '&.Mui-focused fieldset': {
                      border: '1px solid #01C3FF'
                    }
                  }
                }
              }}
            />
          </Box>
        </Stack>
        <Divider />
        <Box
          className="table-padding"
          sx={{ padding: '20px 30px', width: '100%', display: 'table', tableLayout: 'fixed', overflowX: 'auto' }}
        >
          <TableContainer component={Paper} sx={{ background: 'white' }}>
            <Table className="table-p" size="small">
              <TableHead style={{ background: '#536580' }}>
                <TableRow>
                  {props.headCell?.map((item, idx) => <TableHeadCell key={'head' + item.id + idx} headCell={item} />)}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.tableData?.map((item: any, idx: number) => (
                  <TableRow
                    key={idx}
                    style={item?.is_send == 1 || item?.is_disposition == 1 ? { backgroundColor: '#f0f0f0' } : {}}
                  >
                    {props.headCell?.map(column => {
                      if (column.label == 'Action') {
                        return (
                          <TableCell align="left" key={column.label + item.id + idx}>
                            {renderAction(item)}
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell align="left" key={column.label + idx + item.id}>
                          {column.id == 'is_read'
                            ? getStatusRead(item[column.id])
                            : column.id == 'status'
                              ? getStatusLabel(item[column.id])
                              : column.id == 'mail_status'
                                ? getSuratLabel(item[column.id])
                                : item[column.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={props.totalData ? +props?.totalData : 0}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={props.totalData ? state.pagination.currentPage : 0}
            rowsPerPage={state.pagination.rowPerPage}
            rowsPerPageOptions={[10, 25, 100]}
            ActionsComponent={TablePaginationActions}
          />
        </Box>
      </Paper>
    </>
  );
};

export default TableWrapper;
