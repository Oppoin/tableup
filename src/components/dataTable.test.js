import React from 'react';
import { shallow, mount } from 'enzyme';
import EnhancedTable from './dataTable';
import TablePagination from 'material-ui/Table'

it('renders without crashing', () => {
  shallow(<EnhancedTable />);
});

it('renders sample data', () => {
    const mockdata = [{"type":"User","id":"9","attributes":{"username":"Kamren","email":"Lucio_Hettinger@annie.ca"},"relationships":{"groups":{"data":[],"meta":{"count":0}}},"links":{"self":"http://apiplaceholder.oppoin.com/users/9/"}}];
    const wrapper = mount(<EnhancedTable data={mockdata}/>);

    expect(wrapper.find('tr').length).toEqual(2);
  });