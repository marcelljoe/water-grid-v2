import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Container,
  TableSortLabel,
  Box,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  Collapse
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  AddCircleOutline,
  AddOutlined,
  DatasetLinkedOutlined,
  RemoveCircleOutline,
  RemoveOutlined
} from '@mui/icons-material';
import { isTemplateTail } from 'typescript';

type Column = {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
};

type Props = {
  data: any;
  columns: readonly Column[];
  values: any;
  dataUpdate: any;
};

function CollapsibleMenuTable(props: Props) {
  let { data, columns, values, dataUpdate }: any = props;
  const [datas, setDatas] = React.useState<any>(data);
  const [checkedStates, setCheckedStates] = React.useState<any>({});
  const [checkboxState, setCheckboxState] = React.useState<any>({});
  const [open, setOpen] = React.useState(false);
  const [valuesd, setValuesd] = React.useState(props.values);

  const handleChange = (event: any, key: any) => {
    setCheckedStates({ ...checkedStates, [key]: event.target.checked });
  };

  const [expandedRows, setExpandedRows] = React.useState<any>([]);

  const renderMenuItems = (data: any, expandedRows: any, toggleRow: any, columns: any) => {
    return data?.map((menuItem: any, index: number) => (
      <React.Fragment key={menuItem.id}>
        <TableRow>
          <TableCell key={menuItem.menu + index}>
            {menuItem.child && menuItem.child.length > 0 && (
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <RemoveOutlined /> : <AddOutlined />}
              </IconButton>
            )}
            {menuItem.menu}
          </TableCell>
          <TableCell key={menuItem.m_insert + index + 'm_insert1'} align="center" style={{ width: '100px' }}>
            <Checkbox
              checked={menuItem.m_insert}
              onChange={event => handleCheckBox(event, { item: menuItem, index, name: 'm_insert' })}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </TableCell>
          <TableCell key={menuItem.m_update + index + 'm_update1'} align="center" style={{ width: '100px' }}>
            <Checkbox
              checked={menuItem.m_update}
              onChange={event => handleCheckBox(event, { item: menuItem, index, name: 'm_update' })}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </TableCell>
          <TableCell key={menuItem.m_delete + index + 'm_delete1'} align="center" style={{ width: '100px' }}>
            <Checkbox
              checked={menuItem.m_delete}
              onChange={event => handleCheckBox(event, { item: menuItem, index, name: 'm_delete' })}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </TableCell>
          <TableCell key={menuItem.m_view + index + 'm_view1'} align="center" style={{ width: '100px' }}>
            <Checkbox
              checked={menuItem.m_view}
              onChange={event => handleCheckBox(event, { item: menuItem, index, name: 'm_view' })}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </TableCell>
        </TableRow>

        {menuItem.child && menuItem.child.length > 0 && (
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    {menuItem.menu}
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 'bold' }}>
                          Menu
                        </TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold' }}>
                          Insert
                        </TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold' }}>
                          Update
                        </TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold' }}>
                          Delete
                        </TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold' }}>
                          View
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {menuItem.child.map((child: any, indexx: number) => (
                        <TableRow key={child.id}>
                          <TableCell component="th" scope="row" key={child.menu + indexx}>
                            {child.menu}
                          </TableCell>
                          <TableCell
                            key={child.m_insert + indexx + 'm_insert'}
                            align="center"
                            style={{ width: '100px' }}
                          >
                            <Checkbox
                              onChange={event => handleCheckBox(event, { item: child, index, name: 'm_insert' })}
                              checked={child.m_insert}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </TableCell>
                          <TableCell
                            key={child.m_update + indexx + 'm_update'}
                            align="center"
                            style={{ width: '100px' }}
                          >
                            <Checkbox
                              checked={child.m_update}
                              onChange={event => handleCheckBox(event, { item: child, index, name: 'm_update' })}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </TableCell>
                          <TableCell
                            key={child.m_delete + indexx + 'm_delete'}
                            align="center"
                            style={{ width: '100px' }}
                          >
                            <Checkbox
                              checked={child.m_delete}
                              onChange={event => handleCheckBox(event, { item: child, index, name: 'm_delete' })}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </TableCell>
                          <TableCell key={child.m_view + indexx + 'm_view'} align="center" style={{ width: '100px' }}>
                            <Checkbox
                              checked={child.m_view}
                              onChange={event => handleCheckBox(event, { item: child, index, name: 'm_view' })}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        )}
      </React.Fragment>
    ));
  };

  const renderHeadTable = (column: any) => {
    return (
      <TableRow>
        {column.map((columns: Column) => (
          <TableCell
            key={columns.id}
            align={columns.label == 'Menu' ? 'left' : 'center'}
            style={{ width: '100px', fontWeight: 'bold' }}
          >
            {columns.label}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const handleCheckBox = async (e: React.ChangeEvent<HTMLInputElement>, param: any) => {
    const { item, index, name } = param;
    const tempAccess: any = datas;

    if (item.level != 1) {
      let found = {
        index: '',
        menu_header: ''
      };
      const header = item.header;
      await tempAccess.map((el: any, index: number) => {
        if (el.id == header) {
          found = { ...el, index };
          return;
        }
      });

      const accessChildren = tempAccess[found.index].child;

      await accessChildren.map((el: any, index: number) => {
        if (el.id == item.id) {
          accessChildren[index][name] = e.target.checked;
          accessChildren[index].type = e.target.checked;
        }

        if (
          accessChildren[index].m_insert ||
          accessChildren[index].m_update ||
          accessChildren[index].m_delete ||
          accessChildren[index].m_view
        ) {
          tempAccess[found.index][name] = true;
        }
      });
    }

    if (item.level == 1) {
      tempAccess[index][name] = e.target.checked;

      const accessChildren = tempAccess[index].child;

      if (accessChildren.length > 0) {
        await accessChildren.map((el: any, index: number) => {
          accessChildren[index][name] = e.target.checked;
          accessChildren[index].type = e.target.checked;
        });
      }
    }
    setValuesd([...tempAccess]);
    renderMenuItems(tempAccess, expandedRows, toggleRow, columns);
  };

  useEffect(() => {
    dataUpdate(valuesd);
  }, [valuesd]);

  const toggleRow = (id: any) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId: any) => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>{renderHeadTable(columns)}</TableHead>
        <TableBody>{renderMenuItems(datas, expandedRows, toggleRow, columns)}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default CollapsibleMenuTable;
