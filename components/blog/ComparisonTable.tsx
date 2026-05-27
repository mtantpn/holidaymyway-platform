interface ComparisonTableProps {
  heading: string
  columns: string[]
  rows: {
    name: string
    values: string[]
    affiliateUrl: string
    highlight?: boolean
  }[]
}

export default function ComparisonTable({ heading, columns, rows }: ComparisonTableProps) {
  if (!rows || rows.length === 0) return null

  const dataColumns = columns.slice(0, -1)

  return (
    <div className="my-10 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        <caption className="mb-3 px-4 pt-4 text-left font-poppins text-lg font-bold text-holiday-navy">
          {heading}
        </caption>
        <thead className="bg-holiday-navy text-white">
          <tr>
            {dataColumns.map((col) => (
              <th key={col} className="px-4 py-3 text-left font-semibold">{col}</th>
            ))}
            <th className="px-4 py-3 text-left font-semibold">
              {columns[columns.length - 1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-t border-gray-100 ${
                row.highlight
                  ? 'border-l-4 border-l-holiday-teal bg-holiday-teal/5'
                  : 'odd:bg-white even:bg-gray-50'
              }`}
            >
              <td className="px-4 py-3 font-medium text-holiday-navy">
                {row.name}
                {row.highlight && (
                  <span className="ml-2 rounded-full bg-holiday-teal px-2 py-0.5 text-xs font-semibold text-white">
                    Best pick
                  </span>
                )}
              </td>
              {row.values.map((val, j) => (
                <td key={j} className="px-4 py-3 text-gray-600">{val}</td>
              ))}
              <td className="px-4 py-3">
                <a
                  href={row.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-block rounded-lg bg-holiday-teal px-4 py-2 text-xs font-semibold text-white hover:bg-holiday-teal/90 transition-colors"
                >
                  Book Now
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
