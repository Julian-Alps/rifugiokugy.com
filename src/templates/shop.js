import React from 'react'
import * as PropTypes from "prop-types"
import TagList from '../components/TagList'
import { graphql } from 'gatsby'
import Layout from '../components/LayoutImg'
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from '../components/Content'
import Testimonials from '../components/Testimonials'
import LeftCard from '../components/Cards/LeftCard'
import RightCard from '../components/Cards/RightCard'

const ShopPageTemplate = ({
  content,
  contentComponent,
  territoryProducts,
  ourProducts,
  testimonials,
  tags,
  langKey }) => {
  const PageContent = contentComponent || Content
  return (
      <div className="content">
        <section className="section">
          <PageContent className="container content" content={content} />
          </section>
          <RightCard idlink="our-products" rightCard={ourProducts} interiorColor='has-background-white' frameColor='#AA4A39'/>
          <Testimonials testimonials={testimonials} />
          <LeftCard idlink="territory-products" leftCard={territoryProducts} interiorColor='has-background-white' frameColor='#709C34'/>
          <TagList tags={tags} langKey={langKey}/>
      </div>
)
}

ShopPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  territoryProducts: PropTypes.object,
  ourProducts: PropTypes.object,
  testimonials: PropTypes.array,
  tags: PropTypes.array,
  langKey: PropTypes.string
}

class ShopPage extends React.Component {

  render() {
    var dataMarkdown = [];
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark
    }
    const jsonData = this.props.data.allArticlesJson.edges[0].node.articles;
    const { frontmatter } = dataMarkdown;
    const image = frontmatter.image.childImageSharp.fluid.src;
    const langKey = frontmatter.lang;
    const tags = frontmatter.tags;
    const bgImage = frontmatter.bgImage;
    return (
      <Layout className="hero-body" data={this.props.data} bgImage={bgImage} jsonData={jsonData} location={this.props.location}>
        <SEO
          frontmatter={frontmatter}
          postImage={image}
        />
        <div>
            <ShopPageTemplate
            contentComponent={HTMLContent}
            title={dataMarkdown.frontmatter.title}
            content={dataMarkdown.html}
            territoryProducts={frontmatter.territoryProducts}
            testimonials={dataMarkdown.frontmatter.testimonials}
            ourProducts={frontmatter.ourProducts}
            tags={tags}
            langKey={langKey}
             />
        </div>
      </Layout>
    )
  }
}

ShopPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
}

export default ShopPage

export const pageQuery = graphql`
  query ShopPageQuery($id: String!) {
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
        testimonials {
          author
          quote
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
        territoryProducts {
          title
          text
          imageInfo {
            image {
              childImageSharp {
                fluid(maxWidth: 1500, quality: 84) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            alt
          }
        }
        ourProducts {
          title
          text
          imageInfo {
            image {
              childImageSharp {
                fluid(maxWidth: 1500, quality: 84) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            alt
          }
        }
      }
      fields {
        slug
      }
    }
  }
`
