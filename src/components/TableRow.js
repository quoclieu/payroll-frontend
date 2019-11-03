import React from 'react';

const TableRow = props => {
  return (
    <tr>
      <td>
        <strong>{props.title}</strong>
      </td>
      <td>{props.value}</td>
    </tr>
  );
};

export default TableRow;
