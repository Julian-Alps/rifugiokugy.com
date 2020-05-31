import React from "react"
import * as PropTypes from "prop-types"
import TagList from '../components/TagList'
import { graphql } from 'gatsby'
import Layout from "../components/LayoutImg"
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from "../components/Content"
import Table from '../components/Table/Table'

const OffersPageTemplate = ({ title, content, contentComponent, rows, tags, langKey }) => {
  const PageContent = contentComponent || Content
  return (
      <div className="container content">
       <h1 className="title">{title}</h1>
        <Table rows={rows}/>
        <section className="section">
          <PageContent className="container content" content={content} />
          <TagList tags={tags} langKey={langKey}/>
        </section>
      </div>
)
}

OffersPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  rows: PropTypes.array,
  tags: PropTypes.array,
  langKey: PropTypes.string
}

class OffersPage extends React.Component {

  render() {
    var dataMarkdown = [];
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark
    }
    const jsonData = this.props.data.allArticlesJson.edges[0].node.articles;
    const { frontmatter } = dataMarkdown;
    const image = frontmatter.image.childImageSharp.fluid.src;
    const bgImage = frontmatter.bgImage;
    const langKey = frontmatter.lang;
    const tags = frontmatter.tags;
    return (
      <Layout className="hero-body" data={this.props.data} bgImage={bgImage} jsonData={jsonData} location={this.props.location}>
        <SEO
          frontmatter={frontmatter}
          postImage={image}
        />
        <div>
            <OffersPageTemplate
            contentComponent={HTMLContent}
            title={dataMarkdown.frontmatter.title}
            content={dataMarkdown.html}
            rows={dataMarkdown.frontmatter.rows}
            tags={tags}
            langKey={langKey}
             />
        </div>
      </Layout>
    )
  }
}

OffersPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
}

export default OffersPage

export const pageQuery = graphql`
  query OffersPageQuery($id: String!) {
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
        rows {
          name
          num
          price
          pens
          wc
          type
        }
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
      }
      fields {
        slug
      }
    }
  }
`
