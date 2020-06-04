import React from "react"
import * as PropTypes from 'prop-types'
import ImageComp from '../ImageComp'
import Title from './Title'

class FullCard extends React.Component {

  render () {
    const props = this.props
    const title = props.fullCard.title
    const slogan = props.fullCard.slogan
    const text = props.fullCard.text
    const imageComp = props.fullCard.imageComp
    const imageStyle = props.imageStyle
    const interiorColor = props.interiorColor
    const interiorFrameColor = props.interiorFrameColor
    const links = props.fullCard.links
    let  buttonLinks
    if(links) {
      buttonLinks = <ul style={{ listStyle: 'none' }}>
      {links.map((link, id) =>
        <li key={id}><a key={'link' + id} href={link.href}>{link.text}</a></li>
      )}
      </ul>
    } else {
      buttonLinks = ''
    }

    return (
      <div id={props.idlink} className='content' style={{ backgroundColor: interiorFrameColor }}>
        <h4 className="has-text-weight-bold has-text-centered is-size-1-desktop is-size-4-mobile fullcard-slogan"
          style={{
            boxShadow: '0.5rem 0 0 #709C34, -0.5rem 0 0 #709C34',
            backgroundColor: '#709C34',
            color: 'white',
            padding: '1rem',
            position: 'relative',
            zIndex: '20'
          }}
          >{slogan}</h4>
       <ImageComp imageComp={imageComp} imageStyle={imageStyle}/>
       <div className="section">
         <div className={'section ' + interiorColor + ' interior-card'} >
           <Title title={title} />
             <p>{text}</p>
             {buttonLinks}
        </div>
      </div>
    </div>
    )
  }
}

FullCard.propTypes = {
  idlink: PropTypes.string,
  fullCard: PropTypes.object,
  imageComp: PropTypes.object,
  imageStyle: PropTypes.string,
  interiorColor: PropTypes.string,
  interiorFrameColor: PropTypes.string
}

export default FullCard
