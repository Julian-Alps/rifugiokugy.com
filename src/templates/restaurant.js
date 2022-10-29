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
import menu from "../../static/img/menu.pdf"
import MenuPDF from '../components/MenuPDF'

const RestaurantPageTemplate = ({
  content,
  contentComponent,
  breakfast,
  menu,
  sapore,
  testimonials,
  tags,
  langKey }) => {
  const PageContent = contentComponent || Content
  return (
      <div className="content">
        <section className="content">
          <Title title={sapore.title}/>
          <p id="sapore-autentico">{sapore.text}</p>
        </section>
        <LeftCard idlink="breakfast" leftCard={breakfast} interiorColor='has-background-white' frameColor='#709C34'/>
        <Testimonials testimonials={testimonials} />
        <section className="content">
          <PageContent className="container content" content={content} />
          <MenuPDF menu={menu}/>
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
  menu: PropTypes.string,
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
    const image = frontmatter.image.childImageSharp.gatsbyImageData.src;
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
            menu={menu}
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

export const pageQuery = graphql`query RestaurantPageQuery($id: String!) {
  site {
    siteMetadata {
      languages {
        defaultLangKey
        langs
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
          gatsbyImageData(quality: 84, layout: FULL_WIDTH)
        }
      }
      bgImage {
        alt
        image {
          childImageSharp {
            gatsbyImageData(quality: 84, layout: FULL_WIDTH)
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
              gatsbyImageData(quality: 84, layout: FULL_WIDTH)
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
