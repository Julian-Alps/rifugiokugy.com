import React from 'react'
import * as PropTypes from "prop-types"
import { Link } from 'gatsby'
import select from '../components/utils'
import { FormattedMessage } from 'react-intl';
import menuTree from '../data/menuTree'
import { FaFacebook, FaPinterest, FaInstagram, FaYoutube } from 'react-icons/fa';
import  CIN from '../components/CIN'
import Copyright from '../components/Copyright'
import ScrollToTop from '../components/ScrollToTop'
//import logo from '../img/logo-Rifugio-Kugy-bg-dark.svg'
//import logo from '../img/Logo_Rifugio_Kugy_CAI_V.svg'
import logo from '../img/Logo_rifugio_KUGY_CAI_V_sito_white.svg'

class Footer extends React.Component {
  render() {
    const props = this.props;
    const sel = select(props.langKey);
    return (
      <footer className="hero-foot has-background-dark has-text-white-ter">
        <div className="content has-background-dark has-text-centered">
          <img
            src={logo}
            alt="Logo Rifugio Kugy casa alpina Valbruna"
            style={{ margin: '2rem', width: '14em', height: '5em' }}
          />
        </div>
        <div className="content has-text-centered has-text-white-ter">
          <div className="container has-text-white-ter">
              <div className="columns">
                <div className="column is-3">
                <section className="menu">
                    <ul className="menu-list">
                      <li><Link className="navbar-item navbar-item-footer" to={"/" + props.langKey} ><FormattedMessage id="home" /></Link></li>
                      <li><Link className="navbar-item navbar-item-footer" to={"/" + props.langKey + "/" + menuTree.restaurant[sel] +"/"}><FormattedMessage id="restaurant" /></Link></li>
                      <li><Link className="navbar-item navbar-item-footer" to={"/" + props.langKey + "/" + menuTree.shop[sel] +"/"}>
                        <FormattedMessage id="shop" />
                      </Link>
                    </li>
                    <li>
                    <Link className="navbar-item navbar-item-footer" to={"/" + props.langKey + "/" + menuTree.contact[sel] +"/"}>
                      <FormattedMessage id="contact" />
                    </Link>
                  </li>
                    </ul>
                  </section>
                </div>
                <div className="column is-3 social">
                  <a title="facebook" href="https://facebook.com/RifugioKugy/">
                    <FaFacebook className="facebook-icon"  size="2em"/>
                  </a>
                  <a title="pinterest" href="https://www.pinterest.com/rifugiokugy/">
                    <FaPinterest className="pinterest-icon"  size="2em"/>
                  </a>
                  <a title="instagram" href="https://instagram.com/RifugioKugy">
                    <FaInstagram className="instagram-icon" size="2em"/>
                  </a>
                  <a title="youtube" href="https://youtube.com">
                    <FaYoutube className="youtube-icon"  size="2em"/>
                  </a>
                </div>
              </div>
            </div>
            <CIN/>
            <Copyright />
        </div>
        <ScrollToTop/>
      </footer>
    )
  }
}

Footer.propTypes = {
  langKey: PropTypes.string,
}

export default Footer
