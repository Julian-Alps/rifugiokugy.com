import React from "react"
import * as PropTypes from "prop-types"
import { graphql } from 'gatsby'
import { navigate } from "gatsby-link";
import Layout from "../components/LayoutImg"
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from "../components/Content"
import ContactDetails from "../components/ContactDetails"
import OsmMap from '../components/OsmMap'
import FollowUs from '../components/FollowUs'
import { getCurrentLangKey } from 'ptz-i18n';
import { FormattedMessage } from 'react-intl';
import { Format } from 'react-intl-format';


function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

function setActionPath(langKey) {
  let path;
  if(langKey==='en'){
    path = '/en/contact/thanks/';
  }else{
    path = '/it/contatto/grazie/';
  }
  return path;
}

const ContactPageTemplate = ({
  title, content, contentComponent,
  infos, howtoget, image, address, phone,
  email, whatsapp, fb,
  handleSubmit, handleChange, action,
  option, optionA, optionB, optionC
}) => {
  const PageContent = contentComponent || Content
  return (
      <section className="section">
        <div className="container">
          <div className="content">
      <h1 className="title">{title}</h1>
      <PageContent className="container content" content={content} />
      <ContactDetails
        infos={infos}
        howtoget={howtoget}
        image={image}
        address={address}
        phone={phone}
        email={email}
        whatsapp={whatsapp}
        fb={fb}
      />
    <div className="box">
    <h4 className="subtitle"><FormattedMessage id="contact.fill-the-form"/></h4>
      <form
        name="contact"
        method="post"
        action={action}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="contact" />
        <div hidden>
          <label>
            Don’t fill this out:{" "}
            <input name="bot-field" onChange={handleChange} />
          </label>
        </div>
        <div className="field">
          <label className="label" htmlFor="name" ><FormattedMessage id="contact.name"/></label>
          <div className="control">
            <input className="input" type="text" name="name" onChange={handleChange} id="name" required={true} />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="surname" ><FormattedMessage id="contact.surname"/></label>
          <div className="control">
            <input className="input" type="text" name="surname" onChange={handleChange} id="surname" required={true} />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="email"><FormattedMessage id="contact.email"/></label>
            <div className="control">
              <input className="input" type="email" name="email" onChange={handleChange} id="email" required={true} />
            </div>
          </div>
          <div className="field">
           <label className="label" htmlFor="subject"><FormattedMessage id="contact.subject"/></label>
             <div className="control">
               <input className="input" type="subject" name="subject" onChange={handleChange} id="subject" required={true} />
            </div>
        </div>
        <div className="field">
          <div className="control">
          <label className="radio menu-names">
            <input
              type="radio"
              name="gender-male"
              value="male"
              onChange={handleChange}
              defaultChecked
            />
            <span><FormattedMessage id="contact.gender.male"/></span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="gender-female"
              value="female"
              onChange={handleChange}
            />
            <span><FormattedMessage id="contact.gender.female"/></span>
          </label>
        </div>
        </div>
        <div className="field">
        <label className="label">
        <p className="content has-text-weight-semibold">{option}</p>
            <div className="select">
            <select
              className="content"
              name="type-enquiry"
              defaultValue="Type of Enquiry"
              onChange={handleChange}
              required
            >
              <option name="options" disabled hidden>
                Choose
              </option>
              <option>{optionA}</option>
              <option>{optionB}</option>
              <option>{optionC}</option>
            </select>
            </div>
          </label>
        </div>
        <div className="field">
          <label className="label" htmlFor="message"><FormattedMessage id="contact.message"/></label>
          <div className="control">
            <textarea className="textarea" name="message" onChange={handleChange} id="message" required={true} />
          </div>
        </div>
        <div className="field">
        <div className="control">
          <button className="button is-link" type="submit"><FormattedMessage id="contact.send"/></button>
        </div>
        </div>
      </form>
      </div>
      </div>
      </div>
    </section>
)
}

ContactPageTemplate.propTypes = {
  action: PropTypes.string,
  address: PropTypes.string,
  howtoget: PropTypes.array,
  email: PropTypes.string,
  whatsapp: PropTypes.string,
  fb: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  infos: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  option: PropTypes.string,
  optionA: PropTypes.string,
  optionB: PropTypes.string,
  optionC: PropTypes.string,
  phone: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/?no-cache=1", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error));
  };
  render() {
    let dataMarkdown = [];
    let data;
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark;
      data = this.props.data;
    }
    const location = this.props.location;
    const url = location.pathname;
    const { langs, defaultLangKey } = data.site.siteMetadata.languages;
    this.langKey = getCurrentLangKey(langs, defaultLangKey, url);
    const action = setActionPath(this.langKey);
    const jsonData = data.allArticlesJson.edges[0].node.articles;
    const howtoget = dataMarkdown.frontmatter.howtoget;
    const address = dataMarkdown.frontmatter.address;
    const phone = dataMarkdown.frontmatter.phone;
    const email = dataMarkdown.frontmatter.email;
    const whatsapp = dataMarkdown.frontmatter.whatsapp;
    const fb = dataMarkdown.frontmatter.fb;
    const locations = dataMarkdown.frontmatter.locations;
    const { lat } = locations;
    const { lng } = locations;
    const { message } = locations;
    const linkinsta = dataMarkdown.frontmatter.linkinsta;
    const instagram = dataMarkdown.frontmatter.instagram;
    const { frontmatter } = dataMarkdown;
    const imageSEO = frontmatter.image.childImageSharp.fluid.src;
    const bgImage = frontmatter.bgImage;
    return (
      <Layout className="hero-body" data={data} bgImage={bgImage} jsonData={jsonData} location={location}>
        <SEO
          frontmatter={frontmatter}
          postImage={imageSEO}
        />
          <Format>
           {intl => (
            <div className="container">
                <ContactPageTemplate
                  contentComponent={HTMLContent}
                  infos={intl.formatMessage({ id: 'contact.infos' })}
                  howtoget={howtoget}
                  address={address}
                  phone={phone}
                  email={email}
                  whatsapp={whatsapp}
                  fb={fb}
                  title={dataMarkdown.frontmatter.title}
                  content={dataMarkdown.html}
                  onSubmit={this.handleSubmit}
                  action={action}
                  option={intl.formatMessage({ id: 'contact.enquiry' })}
                  optionA={intl.formatMessage({ id: 'contact.enquiry.a' })}
                  optionB={intl.formatMessage({ id: 'contact.enquiry.b' })}
                  optionC={intl.formatMessage({ id: 'contact.enquiry.c' })}
                 />
            </div>
          )}
        </Format>
       <OsmMap lat={lat} lng={lng} message={message}/>
      <FollowUs link={linkinsta} instagram={instagram}/>
    </Layout>
    )
  }
}

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  location: PropTypes.object,
}

export default ContactPage;

export const pageQuery = graphql`
  query ContactPageQuery($id: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    allArticlesJson(filter:{title:{eq:"home"}}){
   edges{
     node{
       articles {
         en
         it
       }
     }
   }
  }
    markdownRemark(id: {eq: $id}) {
      html
      frontmatter {
        id
        title
        description
        tags
        lang
        image {
          childImageSharp {
            fluid(maxWidth: 1500, quality: 84) {
              ...GatsbyImageSharpFluid
              src
            }
          }
        }
        bgImage {
          alt
          image {
            childImageSharp {
              fluid(maxWidth: 1500, quality: 84) {
                ...GatsbyImageSharpFluid
                src
              }
            }
          }
        }
        howtoget
        address
        phone
        email
        whatsapp
        fb
        locations{
          lat
          lng
          message
        }
        linkinsta
        instagram
      }
      fields {
        slug
      }
    }
  }
`
