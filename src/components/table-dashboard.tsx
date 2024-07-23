import React from 'react';

interface TableProps {
  headers: string[];
  data: Array<{ [key: string]: string }>;
}

export default function TableDashboard({ headers, data }: TableProps) {
  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden p-4">
      <table className="w-full min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {header === 'Ações' ? (
                    <div className="flex space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">Editar</button>
                      <button className="text-red-500 hover:text-red-700">Excluir</button>
                    </div>
                  ) : (
                    row[header]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
