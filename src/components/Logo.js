import React from 'react'
import * as PropTypes from "prop-types"
import { Link } from 'gatsby'

const Logo = ({ logo }) => (

  <Link to="/" title="Rifugio Kugy">
    <img src={logo} alt="Rifugio Kugy logo" id="logo"
         style={{
           position: 'absolute',
           left: '40%',
           top: '70%',
           padding: '10% 1%',
           width: '220px' }} />
  </Link>
)

Logo.propTypes = {
  logo: PropTypes.string,
}

export default Logo;
