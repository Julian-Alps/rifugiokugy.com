import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/LayoutImg'
import NewsRoll from '../components/NewsRoll'
import SEO from '../components/SEO/SEO'
import { FormattedMessage } from 'react-intl';
import { graphql } from 'gatsby'

export default class NewsIndexPage extends React.Component {

  render() {
    const data = this.props.data;
    const location = this.props.location;
    const jsonData = data.allArticlesJson.edges[0].node.articles;
    const bgImage = data.markdownRemark.frontmatter.bgImage;

  return (
      <Layout data={data} bgImage={bgImage} jsonData={jsonData} location={location}>
      <SEO
        frontmatter={data.markdownRemark.frontmatter}
        />
      <section className="content">
          <div className="container">
            <div className="content">
            <div
                className="container"
              >
                <h1
                  className="has-text-weight-bold is-size-1"
                  style={{
                    backgroundColor: '#709C34',
                    color: 'white',
                    padding: '1rem',
                  }}
                >
                  <FormattedMessage id="news-message" />
                </h1>
              </div>
            </div>
             <NewsRoll />
            </div>
        </section>
      </Layout>
    )
  }
}

NewsIndexPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.shape({
   pathname: PropTypes.string.isRequired,
 }).isRequired,
}

export const pageQuery = graphql`query NewsIndex($id: String!) {
  site {
    siteMetadata {
      title
      languages {
        langs
        defaultLangKey
      }
    }
  }
  allArticlesJson(filter: {title: {eq: "home"}}) {
    edges {
      node {
        articles {
          en
          it
        }
      }
    }
  }
  markdownRemark(id: {eq: $id}) {
    id
    html
    frontmatter {
      id
      date
      title
      description
      tags
      lang
      bgImage {
        alt
        image {
          childImageSharp {
            gatsbyImageData(quality: 84, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
}
`
