import * as React from 'react'
import * as PropTypes from "prop-types"
import { getSrc } from 'gatsby-plugin-image'
import TagList from '../components/TagList'
import { graphql } from 'gatsby'
import Layout from '../components/LayoutImg'
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from '../components/Content'
import Title from '../components/Cards/Title'
import Testimonials from '../components/Testimonials'
import menu from "../../static/img/menu.pdf"
//import MenuPDF from '../components/MenuPDF'
/* put this between PageContent and Testimonial components -> <MenuPDF menu={menu}/> */

const RestaurantPageTemplate = ({
  content,
  contentComponent,
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
        <section className="content">
          <PageContent className="container content" content={content} />
          <Testimonials testimonials={testimonials} />
        </section>
          <TagList tags={tags} langKey={langKey}/>
      </div>
)
}

RestaurantPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
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
    const image = frontmatter.image;
    const imageSEO = getSrc(image) || image;
    const langKey = frontmatter.lang;
    const tags = frontmatter.tags;
    const bgImage = frontmatter.bgImage;
    return (
      <Layout className="hero-body" data={this.props.data} bgImage={bgImage} jsonData={jsonData} location={this.props.location}>
        <SEO
          frontmatter={frontmatter}
          postImage={imageSEO}
        />
        <div>
            <RestaurantPageTemplate
            contentComponent={HTMLContent}
            title={dataMarkdown.frontmatter.title}
            content={dataMarkdown.html}
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
    }
    fields {
      slug
    }
  }
}
`
