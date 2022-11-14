import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import menu_OP from '../data/ourProdMenu'
import menu_TP from '../data/territoryProdMenu'
import menuTree from '../data/menuTree'
import select from '../components/utils'

const RootMenuMobile = ( props ) => {

    const langKey = props.langKey;
    const sel = select(langKey);

    return(
    <div className='navbar-item has-dropdown is-hoverable'>
      <Link className="navbar-link" to={ "/" + props.langKey + "/" + menuTree.shop[sel]  + "/" }>
          <FormattedMessage id="shop"/>
      </Link>
        <div className="content">
          <div className="navbar-item ">
        {/* accordion begin */}
        <Link className="navbar-item" to={ menu_OP.ourProducts[sel] }>
          <FormattedMessage id="our-products"/>
        </Link>
        <Link className="navbar-item" to={ menu_TP.territoryProducts[sel] }>
          <FormattedMessage id="territory-products"/>
        </Link>
        {/* end_accordion */}
      </div>
    </div>
</div>
  );
};

RootMenuMobile.propTypes = {
  props: PropTypes.object,
  langKey: PropTypes.string
};

export default RootMenuMobile;
