import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import Dropdown from '../components/DropDownMenu'
import { FormattedMessage } from 'react-intl';
import menu_Sleep from '../data/sleepMenu'
import menu_Act from '../data/activitiesMenu'
import menuTree from '../data/menuTree'
import select from '../components/utils'
import { FaAngleRight } from 'react-icons/fa'


const RootMenu = ( props ) => {
    const langKey = props.langKey;
    const keys_Sleep = [ 'rooms', 'rooms.big' ]
    const keys_Act = [ 'activities.summer', 'activities.winter' ]
    const sel = select(props.langKey);

    return(
      <div className='navbar-item has-dropdown is-hoverable'>
        <Link className="navbar-link" to={ "/" + props.langKey + "/" + menuTree.home[sel] + "/" }>
          <FormattedMessage id="home"/>
        </Link>
        <div className="navbar-dropdown">
          <Link className="navbar-item" to={ "/" + props.langKey + "/" + '#welcome' }>
            <FormattedMessage id="welcome"/>
          </Link>
          <Link className="navbar-item" to={ "/" + props.langKey + "/" + '#takeaway' }>
            <FormattedMessage id="takeaway"/>
          </Link>
          <div className="nested navbar-item dropdown">
            <div className="dropdown-trigger">
              <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <FormattedMessage id="sleeping"/>
                <span className="icon is-small" style={{ color: 'green'}}>
                  <FaAngleRight  aria-hidden="true"/>
                </span>
              </button>
           </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
               <div className="dropdown-content">
               <Dropdown
                 langKey={langKey}
                 base={ menu_Sleep.sleeping[sel] }
                 baseName="sleeping"
                 switches={keys_Sleep}
                 links={menu_Sleep}
               />
           </div>
          </div>
        </div>
        <Link className="navbar-item" to={ "/" + props.langKey + "/" + '#prices' }>
          <FormattedMessage id="rooms.prices"/>
        </Link>
      <div className="nested navbar-item dropdown">
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
            <FormattedMessage id="activities"/>
            <span className="icon is-small" style={{ color: 'green'}}>
              <FaAngleRight  aria-hidden="true"/>
            </span>
          </button>
       </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
           <div className="dropdown-content">
           <Dropdown
             langKey={langKey}
             base={ menu_Act.activities[sel] }
             baseName="activities"
             switches={keys_Act}
             links={menu_Act}
           />
       </div>
      </div>
    </div>
</div>
</div>
  );
};

RootMenu.propTypes = {
  props: PropTypes.object,
  langKey: PropTypes.string
};

export default RootMenu;
