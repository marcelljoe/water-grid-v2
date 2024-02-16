import React, { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Chip,
  Button,
  Box,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import TableHeadCell from '@/components/Table/TableHeadCell';
import { IDataMenu } from './Table.types';
import { grey } from '@mui/material/colors';
import Skeleton from '@mui/material/Skeleton';

type Column = {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
};

type Props = {
  data: IDataMenu[] | undefined;
  columns: readonly Column[];
  modals: any;
  onFormSubmit: any;
  loading?: boolean;
};

const getStatusLabel = (programStatus: number): JSX.Element => {
  let text: string = '';
  let color: any = 'primary';

  switch (programStatus) {
    case 0:
      text = 'Non Active';
      color = 'error';
      break;
    case 1:
      text = 'Active';
      color = 'success';
      break;
    default:
      text;
      color;
  }

  return <Chip label={text} color={color} variant="outlined" />;
};

function MenuTable(props: Props) {
  const { data, modals, onFormSubmit } = props;
  const [open, setOpen] = React.useState(false);

  const RenderBodyTable = useMemo(() => {
    return data?.map((item, index: number) => (
      <React.Fragment key={item.path + index}>
        <TableRow>
          <TableCell>
            {item.child.length > 0 && (
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <RemoveOutlined /> : <AddOutlined />}
              </IconButton>
            )}
          </TableCell>
          <TableCell>{item.menu}</TableCell>
          <TableCell align="center" style={{ width: '10px' }}>
            {item.path}
          </TableCell>
          <TableCell align="center" style={{ width: '10px' }}>
            {getStatusLabel(item.status)}
          </TableCell>
          <TableCell align="center" style={{ width: '10px' }}>
            {item.sort}
          </TableCell>
          <TableCell align="center">
            <div>
              <IconButton onClick={() => onFormSubmit({ id: item.id, menu: item.menu, type: 'delete' })}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => modals(true, item)}>
                <EditIcon />
              </IconButton>
            </div>
          </TableCell>
        </TableRow>

        {item.child && item.child.length > 0 && (
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Table size="small">
                  <TableBody>
                    {item.child.map((itemChild: any) => (
                      <TableRow key={itemChild.name + index}>
                        <TableCell />
                        <TableCell component="th" scope="row">
                          {itemChild.menu}
                        </TableCell>
                        <TableCell align="center" style={{ width: '100px' }}>
                          {itemChild.path}
                        </TableCell>
                        <TableCell align="center" style={{ width: '100px' }}>
                          {getStatusLabel(itemChild.status)}
                        </TableCell>
                        <TableCell align="center" style={{ width: '100px' }}>
                          {itemChild.sort}
                        </TableCell>
                        <TableCell align="center">
                          <div>
                            <IconButton onClick={() => alert('dlt')}>
                              <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={() => modals(true, itemChild)}>
                              <EditIcon />
                            </IconButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Collapse>
            </TableCell>
          </TableRow>
        )}
      </React.Fragment>
    ));
  }, [data, open, props.modals]);

  const RenderHeadTable = useMemo(() => {
    return (
      <TableRow>
        {props.columns?.map(item => {
          return <TableHeadCell headCell={item} key={item.label} />;
        })}
      </TableRow>
    );
  }, []);

  return (
    <Box>
      {/* <Button className="button-menu" variant="contained">
        Add Menu
      </Button> */}
      {/* <Box className="list-table">
        <Divider sx={{ width: '100%' }} />
      </Box> */}
      <Box sx={{ overflowX: 'auto', background: 'white' }} component={Paper}>
        <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed', overflowX: 'auto' }}>
          <Table size="small">
            <TableHead
              // sx={{
              //   bgcolor: grey[200],
              //   '&:hover': { bgcolor: grey[300] }
              // }}
              sx={{ background: 'rgb(83, 101, 128)' }}
            >
              {RenderHeadTable}
            </TableHead>

            {RenderBodyTable ? (
              <TableBody>{RenderBodyTable}</TableBody>
            ) : (
              <Skeleton variant="rectangular" animation="wave" width={2200} height={580} />
            )}
          </Table>
        </Box>
      </Box>
    </Box>
  );
}

export default MenuTable;
