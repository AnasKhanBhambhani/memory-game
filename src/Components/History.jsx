import React from 'react'
import data from '../Store/imagesStore';
console.log(data.history);

const History = () => {
  return (
    <div className="font-sans overflow-x-auto w-[90vw] mx-auto container my-4 rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
              GameID
            </th>
            <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Completed Time
            </th>
            <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
              No Of Turn
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {data?.history?.map((record) => (
            <tr key={record.id}>
              <td className="px-4 py-4 text-center text-sm text-gray-800">
                {record.id}
              </td>
              <td className="px-4 py-4 text-center text-sm text-gray-800">
                {record.minutes} m : {record.seconds} s
              </td>
              <td className="px-4 py-4 text-center text-sm text-gray-800">
                {record.turns}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default History;
