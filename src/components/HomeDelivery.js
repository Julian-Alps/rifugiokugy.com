import React from 'react'
import * as PropTypes from 'prop-types'

class HomeDelivery extends React.Component {
  render() {
    const props = this.props
    const title = props.title
    const text = props.text

    return(
      <div className="box has-background-info has-text-white-ter">
        <h3 className="title">{title}</h3>
        <p className="content">{text}</p>
      </div>
    )
  }
}

HomeDelivery.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string
}

export default HomeDelivery
