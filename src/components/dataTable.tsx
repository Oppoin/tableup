import * as React from 'react';
import styled from 'styled-components';
import Table, { TableBody, TableFooter, TableCell, TableHead, TableRow, TablePagination } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';

const DataTableBase = styled(Paper)`
  overflow: hidden;
`;

const StyledToolbar = styled(Toolbar)`
`;

let id = 0;
function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

interface DataTableProps {
}

export default class DataTable extends React.Component<DataTableProps, {}> {

  render () {
    const page = 1;
    const rowsPerPage = 5;

    return (
      <DataTableBase>
        <StyledToolbar>
          <Typography variant="title" color="inherit">
            Tableup Demo
          </Typography>
          {/*<SearchInput />*/}
        </StyledToolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell numeric>Calories</TableCell>
              <TableCell numeric>Fat (g)</TableCell>
              <TableCell numeric>Carbs (g)</TableCell>
              <TableCell numeric>Protein (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell>{n.name}</TableCell>
                  <TableCell numeric>{n.calories}</TableCell>
                  <TableCell numeric>{n.fat}</TableCell>
                  <TableCell numeric>{n.carbs}</TableCell>
                  <TableCell numeric>{n.protein}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={6}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={() => console.log('TODO')}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </DataTableBase>
    );
  }
}
