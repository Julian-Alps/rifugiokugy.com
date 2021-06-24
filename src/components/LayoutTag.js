import React, { Component } from 'react'
import * as PropTypes from "prop-types"
import Header from '../components/Header'
import Footer from '../components/Footer'
import Main from '../components/Main'
import { Helmet } from 'react-helmet'
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { IntlProvider } from 'react-intl';
import './all.sass'
import CookieConsent from 'react-cookie-consent'
import { FormattedMessage } from 'react-intl'

class TemplateWrapper extends Component {
  constructor(props) {
    super(props);
    this.children = this.props.children;
    const data = this.props.data;
    this.description = data.markdownRemark.frontmatter.description;
    this.className = this.props.className;
    const location = this.props.location;
    this.title = data.markdownRemark.frontmatter.title;
    const url = location.pathname;
    const { langs, defaultLangKey } = data.site.siteMetadata.languages;
    this.langKey = getCurrentLangKey(langs, defaultLangKey, url);
    this.homeLink = `/${this.langKey}/`;
    this.langsMenu = getLangs(langs, this.langKey, getUrlForLang(this.homeLink, url));

    // get the appropriate message file based on langKey
    // at the moment this assumes that langKey will provide us
    // with the appropriate language code
    this.i18nMessages = require(`../data/messages/${this.langKey}`);
  }
  render() {
    return (
      <IntlProvider
        locale={this.langKey}
        messages={this.i18nMessages}
        textComponent={React.Fragment}
      >
        <div>
          <Helmet
            key="app-head"
            defaultTitle={this.title}
            titleTemplate={`%s | ${this.title}`}
          >
          <html lang={this.langKey} />
          <meta name="description"  content={this.description}/>
          </Helmet>
          <Header langKey={this.langKey} langs={this.langsMenu} menu={this.menuTree} />
          <Main key="app-main" className={this.className}>
            {this.children}
          </Main>
          <Footer langKey={this.langKey}/>
            <CookieConsent
                debug={true}
                location="bottom"
                buttonText="Ok!"
                cookieName="kwCookie"
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                expires={150}
                >
                <FormattedMessage id="cookie-message"/>
              </CookieConsent>
        </div>
      </IntlProvider>
    );
  }
}

TemplateWrapper.propTypes = {
  className: PropTypes.string,
  bgImage: PropTypes.object,
  children: PropTypes.object,
  data: PropTypes.object.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  jsonData: PropTypes.object,
  location: PropTypes.object,
}

export default TemplateWrapper
