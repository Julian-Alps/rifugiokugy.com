import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import AccordionCollaps from '../components/AccordionCollaps'
import { FormattedMessage } from 'react-intl';
import menu_Act from '../data/activitiesMenu'
import menuTree from '../data/menuTree'
import select from '../components/utils'


const RootMenuHomeMobile = ( props ) => {
    const langKey = props.langKey;
    const keys_Act = [ 'activities.summer', 'activities.winter' ]
    const sel = select(props.langKey);

    return(
      <div className='navbar-item has-dropdown is-hoverable'>
        <Link className="navbar-link" to={ "/" + props.langKey + "/" + menuTree.home[sel] + "/" }>
          <FormattedMessage id="home"/>
        </Link>
          <div className="content">
            <Link className="navbar-item" to={ "/" + props.langKey + "/" + '#welcome' }>
              <FormattedMessage id="welcome"/>
            </Link>
            <Link className="navbar-item" to={ "/" + props.langKey + "/" + '#prices' }>
              <FormattedMessage id="rooms.prices"/>
            </Link>
            <Link className="navbar-item" to={ "/" + props.langKey + "/" + '#sleeping' }>
              <FormattedMessage id="sleeping"/>
            </Link>
            <div className="navbar-item ">
              {/* accordion begin */}
              <AccordionCollaps
                num='1'
                langKey={langKey}
                base={ menu_Act.activities[sel] }
                baseName="activities"
                switches={keys_Act}
                links={menu_Act}
              />
             {/* end_accordion */}
        </div>
      </div>
  </div>
  );
};

RootMenuHomeMobile.propTypes = {
  props: PropTypes.object,
  langKey: PropTypes.string
};

export default RootMenuHomeMobile;
