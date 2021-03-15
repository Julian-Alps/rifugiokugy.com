import React from 'react'
import * as PropTypes from 'prop-types'
import TagList from '../components/TagList'
import { graphql } from 'gatsby'
import Layout from '../components/LayoutImg'
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from '../components/Content'
import LeftCard from '../components/Cards/LeftCard'
import RightCard from '../components/Cards/RightCard'


const RoomsPageTemplate = ({ title, content, rooms, bigrooms, contentComponent, tags, langKey }) => {
  const PageContent = contentComponent || Content
  return (
      <div className="container content">
       <h1 className="title">{title}</h1>
        <section className="content">
          <PageContent className="container content" content={content} />
            <div className="content">
              <LeftCard className="section" idlink="rooms" leftCard={rooms} interiorColor='has-background-white' frameColor='#709C34'/>
            </div>
            <div className="content">
              <RightCard className="section" idlink="bigrooms" rightCard={bigrooms} interiorColor='has-background-white' frameColor='#709C34'/>
            </div>
          <TagList tags={tags} langKey={langKey}/>
        </section>
      </div>
)
}

RoomsPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  rooms: PropTypes.object,
  bigrooms: PropTypes.object,
  rows: PropTypes.array,
  tags: PropTypes.array,
  langKey: PropTypes.string
}

class RoomsPage extends React.Component {

  render() {
    var dataMarkdown = [];
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark
    }
    const jsonData = this.props.data.allArticlesJson.edges[0].node.articles
    const { frontmatter } = dataMarkdown
    const image = frontmatter.image.childImageSharp.gatsbyImageData.src
    const bgImage = frontmatter.bgImage
    const langKey = frontmatter.lang
    const tags = frontmatter.tags
    return (
      <Layout className="hero-body" data={this.props.data} bgImage={bgImage} jsonData={jsonData} location={this.props.location}>
        <SEO
          frontmatter={frontmatter}
          postImage={image}
        />
        <div>
            <RoomsPageTemplate
              contentComponent={HTMLContent}
              title={dataMarkdown.frontmatter.title}
              content={dataMarkdown.html}
              rooms={frontmatter.rooms}
              bigrooms={frontmatter.bigRooms}
              tags={tags}
              langKey={langKey}
             />
        </div>
      </Layout>
    )
  }
}

RoomsPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
}

export default RoomsPage

export const pageQuery = graphql`query RoomsPageQuery($id: String!) {
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
      rooms {
        title
        text
        links {
          href
          text
        }
        imageInfo {
          image {
            childImageSharp {
              gatsbyImageData(quality: 84, layout: FULL_WIDTH)
            }
          }
          alt
        }
      }
      bigRooms {
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
    }
    fields {
      slug
    }
  }
}
`
