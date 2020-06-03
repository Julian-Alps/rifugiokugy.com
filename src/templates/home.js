import React from "react"
import * as PropTypes from 'prop-types'
import TagList from '../components/TagList'
import { graphql } from 'gatsby'
import Layout from '../components/LayoutImg'
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from '../components/Content'
import HomeDelivery from '../components/HomeDelivery'
import LeftCard from '../components/Cards/LeftCard'
import RoomGal from '../components/Masonry/RoomGal'
import Table from '../components/Table/Table'
import FullCard from '../components/Cards/FullCard'
import Title from '../components/Cards/Title'
import Testimonials from '../components/Testimonials'
import OsmMap from '../components/OsmMap'

const HomePageTemplate = ({
  rooms,
  masonry,
  titlePrice,
  rows,
  activities,
  testimonials,
  content,
  contentComponent,
  titleHD,
  textHD,
  tags,
  langKey
}) => {
  const PageContent = contentComponent || Content
  const lat = 46.4929172
  const lng = 13.4911627
  const message = 'message!'

  return (
    <div className="content">
      <div className="content" id="welcome">
        <PageContent className="container content" content={content} />
      </div>
      <div className="section">
        <HomeDelivery title={titleHD} text={textHD} />
      </div>
      <div className="content">
        <LeftCard className="section" idlink="sleeping" leftCard={rooms} interiorColor='has-background-white' frameColor='#73CA25'/>
        <RoomGal masonry={masonry} />
      </div>
      <Testimonials testimonials={testimonials} />
      <div className="content" id="prices">
        <Title title={titlePrice}/>
        <Table rows={rows}/>
      </div>
      <FullCard className="content" idlink="activities" fullCard={activities} interiorColor='background-card-red' interiorFrameColor='#AA4A39' frameColor='#E5E5E5'/>
      <div className="content" id="territory">
        <OsmMap lat={lat} lng={lng} message={message}/>
      </div>
      <section className="section">
          <TagList tags={tags} langKey={langKey}/>
      </section>
    </div>
)
}

HomePageTemplate.propTypes = {
  rooms: PropTypes.object,
  masonry: PropTypes.object,
  activities: PropTypes.object,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  titleHD: PropTypes.string,
  textHD: PropTypes.string,
  heading: PropTypes.string,
  rows: PropTypes.array,
  titlePrice: PropTypes.string,
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
    const image = frontmatter.image.childImageSharp.fluid.src;
    const tags = frontmatter.tags;
    const bgImage = frontmatter.bgImage;
    const titleHD = frontmatter.titleHD
    const textHD = frontmatter.textHD
    const titlePrice = frontmatter.titlePrice

    return (
      <Layout className="hero-body" data={this.props.data} bgImage={bgImage} jsonData={jsonData} location={this.props.location}>
        <SEO
          frontmatter={frontmatter}
          postImage={image}
        />
        <div>
            <HomePageTemplate
              image={dataMarkdown.frontmatter.image}
              heading={dataMarkdown.frontmatter.heading}
              rooms={frontmatter.rooms}
              masonry={frontmatter.masonry}
              titlePrice={titlePrice}
              rows={dataMarkdown.frontmatter.rows}
              activities={frontmatter.activities}
              testimonials={dataMarkdown.frontmatter.testimonials}
              contentComponent={HTMLContent}
              titleHD={titleHD}
              textHD={textHD}
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

export const pageQuery = graphql`
  query HomePageQuery($id: String!) {
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
        titlePrice
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
        heading
        testimonials {
          author
          quote
        }
        titleHD
        textHD
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
                fluid(maxWidth: 1500, quality: 84) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            alt
          }
        }
        masonry{
          photos{
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
