import React from 'react'
import PropTypes from 'prop-types'
import TagList from '../components/TagList'
import { Helmet } from 'react-helmet'
import SEO from '../components/SEO/SEO'
import { graphql } from 'gatsby'
import Layout from '../components/LayoutImg'
import Content, { HTMLContent } from '../components/Content'

export const NewsPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  langKey,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
            <TagList tags={tags} langKey={langKey}/>
          </div>
        </div>
      </div>
    </section>
  )
}

NewsPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  location: PropTypes.object,
  tags: PropTypes.array,
  langKey: PropTypes.string
}

const NewsPost = ({ data, location }) => {
  const { markdownRemark: post } = data
  const jsonData = data.allArticlesJson.edges[0].node.articles;
  const langKey = post.frontmatter.lang;
  const image = post.frontmatter.image.childImageSharp.fluid.src;
  const bgImage = post.frontmatter.bgImage;

  return (
    <Layout className="container" data={data} bgImage={bgImage} jsonData={jsonData} location={location}>
     <SEO
       frontmatter={post.frontmatter}
       postImage={image}
       isBlogPost
     />
      <NewsPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet
            titleTemplate="%s | News"
          >
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={`${post.frontmatter.description}`} />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        langKey={langKey}
      />
    </Layout>
  )
}

NewsPost.propTypes = {
 data: PropTypes.object.isRequired,
 jsonData: PropTypes.object,
 location: PropTypes.object,
}

export default NewsPost

export const pageQuery = graphql`
  query NewsPostByID($id: String!) {
    site {
      siteMetadata {
        title
        languages{
          langs
          defaultLangKey
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
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        id
        title
        image{
          childImageSharp {
        fluid(maxWidth: 1380) {
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
        description
        date
        tags
        lang
      }
    }
  }
`
