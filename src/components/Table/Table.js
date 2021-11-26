import React from "react"
import * as PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

class Table extends React.Component {
  render () {
    const rows = this.props.rows

    return(
      <div className="table-container table__wrapper">
       <table className="table is-bordered is-fullwidth">
        <thead>
         <tr>
          <th><abbr title="Room Name"><FormattedMessage id="table-rooms-names"/></abbr></th>
          <th><abbr title="Number Persons"><FormattedMessage id="table-rooms-number-persons"/></abbr></th>
          <th><abbr title="Half Pension"><FormattedMessage id="table-rooms-pensions"/></abbr></th>
          <th><abbr title="B&B"><FormattedMessage id="table-rooms-B&B"/></abbr></th>
          <th><abbr title="WC"><FormattedMessage id="table-rooms-wc"/></abbr></th>
          <th><abbr title="Bed Types"><FormattedMessage id="table-rooms-beds"/></abbr></th>
        </tr>
       </thead>
       <tbody>
       {rows.map( (row, id)=> (
        <tr key={id}>
         <th key={row.name + id}>{row.name}</th>
         <th key={row.num + id}>{row.num}</th>
         <th key={row.price + id}>{row.price}</th>
         <th key={row.pens + id}>{row.pens}</th>
         <th key={row.wc + id}>{row.wc}</th>
         <th key={row.type + id}>{row.type}</th>
        </tr>
      ))}
       </tbody>
    </table>
  </div>
    )
  }
}

Table.propTypes = {
  rows: PropTypes.array
}

export default Table
