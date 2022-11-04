import React from 'react'
import * as PropTypes from "prop-types"
import { Link } from 'gatsby'
import Logo from '../components/Logo'
import LogoMobile from '../components/LogoMobile'
import logoV from '../img/Logo_rifugio_KUGY_CAI_V_sito.svg'
import logo from '../img/Logo_rifugio_KUGY_CAI_V_sito_white.svg'
import BGImage from '../components/BGImage'
import SelectLanguage from './SelectLanguage';
import { FormattedMessage } from 'react-intl';
import menuTree from '../data/menuTree'
import RootMenu from '../components/RootMenu'
import RootMenuHome from '../components/RootMenuHome'
import RootMenuHomeMobile from '../components/RootMenuHomeMobile'
import RootMenuMobile from '../components/RootMenuMobile'
import {
  BrowserView,
  MobileView,
  isMobile
} from "react-device-detect";
import select from '../components/utils'

class HeaderImg extends React.Component {

  componentDidMount() {

   const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
   if ($navbarBurgers.length > 0) {

     // Add a click event on each of them
     $navbarBurgers.forEach( el => {
       el.addEventListener('click', () => {

         // Get the target from the "data-target" attribute
         const target = el.dataset.target;
         const $target = document.getElementById(target);
         // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
         el.classList.toggle('is-active');
         $target.classList.toggle('is-active');

       });
     });
   }

   // Get all "navbar-link" elements
  const navbarLink = Array.prototype.slice.call(document.querySelectorAll('.navbar-link'), 0);
   // Check if there are any navbar links
  if (navbarLink.length > 0) {

    // Add a click event on each of them
    navbarLink.forEach( el => {
      el.addEventListener('click', () => {
        el.nextElementSibling.classList.toggle('is-hidden-mobile');
      });
    });
  }

  if (isMobile) {

   let navMenu = document.getElementById("navMenu");
   navMenu.style.backgroundColor = "#73CA25";

 }
}

 render() {

   const props = this.props;
   const sel = select(props.langKey);
   return (

<header
    className="hero-head is-fullheight-with-navbar has-background is-size-5 header-content">
    <div className="">
      <BGImage bgImage={props.bgImage} />
      <nav className="navbar" role="navigation" aria-label="main-navigation" style={{ backgroundColor: "white" }}>
        <div className="container">
          <div className="navbar-brand">
          <BrowserView>
            <Logo logo={logo}/>
          </BrowserView>
          <MobileView>
            <LogoMobile logo={logoV}/>
          </MobileView>
            {/* Hamburger menu */}
            <div className="navbar-burger burger" data-target="navMenu">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div id="navMenu" className="navbar-menu">
          <div className="navbar-start has-text-centered">
            <BrowserView viewClassName='navbar-item has-dropdown is-hoverable'>
              <RootMenuHome
                langKey={props.langKey}
                base={"/" + props.langKey + "/" + menuTree.home[sel] +"/"}
                />
            </BrowserView>
            <BrowserView viewClassName='navbar-item has-dropdown is-hoverable'>
              <Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.rooms[sel] +"/"}>
                <FormattedMessage id="rooms" />
              </Link>
            </BrowserView>
            <BrowserView viewClassName='navbar-item has-dropdown is-hoverable'>
              <Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.restaurant[sel] +"/"}>
                <FormattedMessage id="restaurant" />
              </Link>
            </BrowserView>
            <BrowserView viewClassName='navbar-item has-dropdown is-hoverable'>
              <RootMenu
                langKey={props.langKey}
                base={"/" + props.langKey + "/" + menuTree.shop[sel] +"/"}
                />
            </BrowserView>
            <MobileView viewClassName='navbar-item has-dropdown is-hoverable'>
              <RootMenuHomeMobile
                langKey={props.langKey}
                base={"/" + props.langKey + "/" + menuTree.home[sel] +"/"}
                />
            </MobileView>
            <MobileView viewClassName='navbar-item has-dropdown is-hoverable'>
              <Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.rooms[sel] +"/"}>
                <FormattedMessage id="rooms" />
              </Link>
            </MobileView>
            <MobileView viewClassName='navbar-item has-dropdown is-hoverable'>
              <Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.restaurant[sel] +"/"}>
                <FormattedMessage id="restaurant" />
              </Link>
            </MobileView>
            <MobileView viewClassName='navbar-item has-dropdown is-hoverable'>
              <RootMenuMobile
                langKey={props.langKey}
                base={"/" + props.langKey + "/" + menuTree.shop[sel] +"/"}
                />
            </MobileView>
            <Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.activities[sel] +"/"}>
              <FormattedMessage id="activities" />
            </Link>
            <Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.contact[sel] +"/"}>
              <FormattedMessage id="contact" />
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item  has-text-centered">
              <SelectLanguage langs={props.langs} />
            </div>
          </div>
          </div>
        </div>
    </nav>
    </div>
</header>

)}
}

HeaderImg.propTypes = {
  bgImage: PropTypes.object,
  langKey: PropTypes.string,
  langs: PropTypes.array
}

export default HeaderImg;
