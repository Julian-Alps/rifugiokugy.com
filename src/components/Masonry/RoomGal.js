import React from 'react'
import * as PropTypes from 'prop-types'
import MasonryGal from './MasonryGal'

class RoomGal extends React.Component {

  render () {
    const masonry = this.props.masonry

    return(
      <div className="section">
      {masonry &&
        <MasonryGal type='row' photos={masonry.photos}/>
      }
      </div>
    )
  }
}

RoomGal.propTypes = {
  masonry: PropTypes.object
}

export default RoomGal;
