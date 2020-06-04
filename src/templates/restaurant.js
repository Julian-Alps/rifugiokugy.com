import React from 'react'
import * as PropTypes from "prop-types"
import TagList from '../components/TagList'
import { graphql } from 'gatsby'
import Layout from '../components/LayoutImg'
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from '../components/Content'
import Title from '../components/Cards/Title'
import LeftCard from '../components/Cards/LeftCard'
import Testimonials from '../components/Testimonials'

const RestaurantPageTemplate = ({
  title,
  content,
  contentComponent,
  breakfast,
  sapore,
  testimonials,
  tags,
  langKey }) => {
  const PageContent = contentComponent || Content
  return (
      <div className="content">
       <h1 className="title">{title}</h1>
        <section className="content">
          <Title title={sapore.title}/>
          <p id="sapore-autentico">{sapore.text}</p>
        </section>
        <LeftCard idlink="breakfast" leftCard={breakfast} interiorColor='has-background-white' frameColor='#709C34'/>
        <Testimonials testimonials={testimonials} />
        <section className="content">
          <PageContent className="container content" content={content} />
        </section>
          <TagList tags={tags} langKey={langKey}/>
      </div>
)
}

RestaurantPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  breakfast: PropTypes.object,
  sapore: PropTypes.object,
  testimonials: PropTypes.array,
  tags: PropTypes.array,
  langKey: PropTypes.string
}

class RestaurantPage extends React.Component {

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
            <RestaurantPageTemplate
            contentComponent={HTMLContent}
            title={dataMarkdown.frontmatter.title}
            content={dataMarkdown.html}
            breakfast={frontmatter.breakfast}
            sapore={frontmatter.sapore}
            testimonials={dataMarkdown.frontmatter.testimonials}
            tags={tags}
            langKey={langKey}
             />
        </div>
      </Layout>
    )
  }
}

RestaurantPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
}

export default RestaurantPage

export const pageQuery = graphql`
  query RestaurantPageQuery($id: String!) {
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
        sapore {
          title
          text
        }
        breakfast {
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
