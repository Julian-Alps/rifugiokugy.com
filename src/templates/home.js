
import * as React from "react"
import * as PropTypes from 'prop-types'
import { getSrc } from 'gatsby-plugin-image';
import TagList from '../components/TagList'
import { graphql } from 'gatsby'
import Layout from '../components/LayoutImg'
import SEO from '../components/SEO/SEO'
import { Helmet } from 'react-helmet';
import Content, { HTMLContent } from '../components/Content'
import LeftCard from '../components/Cards/LeftCard'
import RoomGal from '../components/Masonry/RoomGal'
import FullCard from '../components/Cards/FullCard'
import Testimonials from '../components/Testimonials'
import InfoMap from '../components/InfoMap'
import Bikes from '../components/Bikes'
import prezzi from "../../static/img/Prezzi_camere_Rifugio_Kugy_11_22.pdf"

const HomePageTemplate = ({
  rooms,
  bikes,
  masonry,
  activities,
  testimonials,
  content,
  contentComponent,
  mapsMessage,
  mapsLink,
  mapsImage,
  tags,
  langKey
}) => {
  const PageContent = contentComponent || Content
  const lat = 46.49273
  const lng = 13.49232

  return (
    <div className="content">
      <div className="content" id="welcome">
        <PageContent className="container content" content={content} />
      </div>
      <div className="content">
        <LeftCard className="section" idlink="sleeping" leftCard={rooms} interiorColor='has-background-white' frameColor='#738173' />
        <RoomGal masonry={masonry} />
      </div>
      <Bikes link={prezzi} imageInfo={bikes} />
      <Testimonials testimonials={testimonials} />
      <FullCard idlink="activities" fullCard={activities} interiorColor='has-background-white' interiorFrameColor='#738173' frameColor='#738173' />
      <div className="content" id="territory">
        <InfoMap lat={lat} lng={lng} link={mapsLink} infoMap={mapsImage} message={mapsMessage} />
      </div>
      <section className="section">
        <TagList tags={tags} langKey={langKey} />
      </section>
    </div>
  )
}

HomePageTemplate.propTypes = {
  rooms: PropTypes.object,
  bikes: PropTypes.object,
  masonry: PropTypes.object,
  activities: PropTypes.object,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  mapsMessage: PropTypes.string,
  mapsLink: PropTypes.string,
  mapsImage: PropTypes.object,
  heading: PropTypes.string,
  rows: PropTypes.array,
  tags: PropTypes.array,
  testimonials: PropTypes.array,
  langKey: PropTypes.string
}

class HomePage extends React.Component {

  render() {
    let data;
    let dataMarkdown = [];
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark
      data = this.props.data;
    }
    const jsonData = data.allArticlesJson.edges[0].node.articles;
    const langKey = dataMarkdown.frontmatter.lang
    const { frontmatter } = data.markdownRemark;
    const image = frontmatter.image;
    const imageSEO = getSrc(image) || image;
    const tags = frontmatter.tags;
    const bgImage = frontmatter.bgImage;
    const maps = frontmatter.maps

    return (
      <Layout className="hero-body" data={this.props.data} bgImage={bgImage} jsonData={jsonData} location={this.props.location}>
        <SEO
          frontmatter={frontmatter}
          postImage={imageSEO}
        />
      <Helmet>
        <meta name="google-site-verification" content="vkzMPkR2C66yqbLk9lHmGs-OzUPaUsFZDp7ymNqweHc" />
      </Helmet>
        <div>
            <HomePageTemplate
              image={dataMarkdown.frontmatter.image}
              heading={dataMarkdown.frontmatter.heading}
              rooms={frontmatter.rooms}
              bikes={frontmatter.bikes.imageInfo}
              masonry={frontmatter.masonry}
              rows={dataMarkdown.frontmatter.rows}
              rows2={dataMarkdown.frontmatter.rows2}
              activities={frontmatter.activities}
              testimonials={dataMarkdown.frontmatter.testimonials}
              contentComponent={HTMLContent}
              mapsMessage={maps.message}
              mapsLink={maps.link}
              mapsImage={maps.imageComp}
              title={dataMarkdown.frontmatter.title}
              content={dataMarkdown.html}
              tags={tags}
              langKey={langKey}
            />
        </div>
      </Layout>
    )
  }
}

HomePage.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
}

export default HomePage

export const pageQuery = graphql`query HomePageQuery($id: String!) {
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
      titlePrice
      priceMessage
      pricemsg1
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
      heading
      testimonials {
        author
        quote
      }
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
      masonry {
        photos {
          src
          srcSet
          sizes
          width
          height
          link
          title
          alt
        }
      }
      bikes {
        imageInfo {
          image {
            childImageSharp {
              gatsbyImageData(quality: 84, layout: FULL_WIDTH)
            }
          }
          alt
        }
      }
      maps {
        message
        link
        imageComp {
          image {
            childImageSharp {
              gatsbyImageData(quality: 84, layout: FULL_WIDTH)
            }
          }
          alt
        }
      }
      activities {
        title
        slogan
        text
        links {
          href
          text
        }
        imageComp {
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
