import React from 'react';
import t from 'prop-types';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import {withStyles} from 'material-ui/styles';

import {
  dataArrayType,
} from '../../shapes.js';

// import Header from './components/Header/Header.js';

const DataTable = ({
  data,
  onQuerySeach,
  querySearchDebounceTime,
  querySearchHintText,
  theme,
  classes
}) => {
  return (
    <Table className={classes.table}>
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
    </Table>
  );

  // return (
  //   <div className="tableup-table-wrapper">
  //
  //     <MuiTable
  //       multiSelectable
  //     >
  //       {/* header */}
  //       <MuiTableHeader
  //         displaySelectAll
  //       >
  //         <MuiTableRow style={{backgroundColor: theme.palette.primary1Color}}>
  //           <MuiTableHeaderColumn colSpan={3} style={{textAlign: 'center'}}>
  //             <Header
  //               onQuerySeach={onQuerySeach}
  //               querySearchDebounceTime={querySearchDebounceTime}
  //               querySearchHintText={querySearchHintText}
  //             />
  //           </MuiTableHeaderColumn>
  //         </MuiTableRow>
  //         <MuiTableRow>
  //           <MuiTableHeaderColumn>ID</MuiTableHeaderColumn>
  //           <MuiTableHeaderColumn>Username</MuiTableHeaderColumn>
  //           <MuiTableHeaderColumn>Email</MuiTableHeaderColumn>
  //         </MuiTableRow>
  //       </MuiTableHeader>
  //
  //       {/* body */}
  //       <MuiTableBody
  //         showRowHover
  //         deselectOnClickaway={false}
  //       >
  //         {data.map(item =>
  //           <MuiTableRow key={item.id}>
  //             <MuiTableRowColumn>{item.id}</MuiTableRowColumn>
  //             <MuiTableRowColumn>{item.attributes.username}</MuiTableRowColumn>
  //             <MuiTableRowColumn>{item.attributes.email}</MuiTableRowColumn>
  //           </MuiTableRow>
  //         )}
  //       </MuiTableBody>
  //     </MuiTable>
  //
  //   </div>
  // );
};

DataTable.propTypes = {
  data: dataArrayType.isRequired,
  onQuerySeach: t.func.isRequired,
  querySearchDebounceTime: t.number,
  querySearchHintText: t.string,
};

DataTable.defaultProps = {
  data: [],
  onQuerySeach: () => {},
  querySearchDebounceTime: 0,
  querySearchHintText: 'Search',
};

export default withStyles(theme => ({
  table: {
    // backgroundColor: 'red',
  },
}))(DataTable);
