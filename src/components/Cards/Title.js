import React from 'react'
import * as PropTypes from 'prop-types'

class Title extends React.Component {

  render () {
    const props = this.props
    const title = props.title
    return (
      <h3 className="title">{title}<hr className="card-line"/></h3>
    )
  }
}

Title.propTypes = {
  title: PropTypes.string
}

export default Title
