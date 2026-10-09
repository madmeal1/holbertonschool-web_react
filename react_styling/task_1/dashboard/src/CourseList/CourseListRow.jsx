import PropTypes from 'prop-types'

function CourseListRow({ isHeader = false, textFirstCell = '', textSecondCell = null }) {
  if (isHeader) {
    return (
      <tr className="bg-table-header opacity-66">
        {textSecondCell === null ? (
          <th colSpan="2" className="border border-gray-400">{textFirstCell}</th>
        ) : (
          <>
            <th className="border border-gray-400">{textFirstCell}</th>
            <th className="border border-gray-400">{textSecondCell}</th>
          </>
        )}
      </tr>
    )
  }

  return (
    <tr className="bg-table-rows opacity-45">
      <td className="border border-gray-400 pl-2">{textFirstCell}</td>
      <td className="border border-gray-400 pl-2">{textSecondCell}</td>
    </tr>
  )
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default CourseListRow
