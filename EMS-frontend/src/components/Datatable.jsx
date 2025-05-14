// components/DataTable.tsx
import React from "react";

const DataTable = ({ data, columns }) => {
  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead className="table-light py-3">
          <tr className="py-3">
            {columns.map((col, idx) => (
              <th key={idx} className="fw-normal text-center table-heading">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-content">
          {data.map((item, i) => (
            <tr key={item.id || i} className="text-center">
              {columns.map((col, j) => (
                <td key={j}>{col.render(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
