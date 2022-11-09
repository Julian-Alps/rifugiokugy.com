import * as React from 'react'
import Image from '../../components/PreviewCompatibleImage'
import MarkdownContent from '../../components/MarkdownContent'
import Title from './Title'
import * as PropTypes from 'prop-types'

class LeftCard extends React.Component {

  render () {
    const props = this.props
    const imageInfo = props.leftCard.imageInfo
    const title = props.leftCard.title
    const text = props.leftCard.text
    const frameColor = props.frameColor
    const interiorColor = props.interiorColor
    const interiorFrameColor = props.interiorFrameColor
    const links = props.leftCard.links
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

    return(

     <div id={props.idlink} className='columns is-vcentered' style={{ backgroundColor: frameColor }}>
       <div className='column'>
          <div className={'section ' + interiorColor + ' interior-card'} style={{ backgroundColor: interiorFrameColor }}>
            <Title title={title} />
            <MarkdownContent className='section' content={text} />
            {buttonLinks}
          </div>
       </div>
       <div className='column'>
        <Image imageInfo={imageInfo}/>
      </div>
     </div>

    )
  }
}

LeftCard.propTypes = {
idlink: PropTypes.string,
leftCard: PropTypes.object,
frameColor: PropTypes.string,
interiorColor: PropTypes.string,
interiorFrameColor: PropTypes.string,
links: PropTypes.string
}

export default LeftCard
