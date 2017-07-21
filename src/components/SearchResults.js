import React from 'react';
import { Table, Icon } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Gender',
  dataIndex: 'gender',
  key: 'gender',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  gender: 'Male',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  gender: 'Female',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  gender: 'Female',
}];

export default class SearchResults extends React.Component {
  render() {
    return (
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={this.props.data}
        pagination={false}
        locale={{ emptyText: 'No data' }}
      />
    );
  }
}

SearchResults.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

// export default function SearchResults() {
//   return (
//     <Table columns={columns} dataSource={data} />
//   )
// }
