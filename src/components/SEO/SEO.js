import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import SchemaOrg from './SchemaOrg';

const SEO = ({ postData, frontmatter = {}, postImage, isBlogPost, children }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            description
            siteUrl
            image
            author {
              name
            }
            organization {
              name
              url
              logo
            }
            social {
              twitter
              fbAppID
            }
          }
        }
      }
    `}
    render={({ site: { siteMetadata: seo } }) => {
      const postMeta =
        frontmatter || postData.childMarkdownRemark.frontmatter || {};

      const title = postMeta.title || seo.title;
      const description = postMeta.description || seo.description;
      const image = postImage ? `${seo.siteUrl}${postImage}` : seo.image;
      const url = postMeta.slug
        ? `${seo.siteUrl}/${postMeta.slug}/`
        : seo.siteUrl;
      const datePublished = isBlogPost ? postMeta.datePublished : false;
      const lang = postMeta.lang || 'it';

      return (
        <React.Fragment>
          <html lang={lang} />
          {/* General tags */}
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="image" content={image} />

          {/* OpenGraph tags */}
          <meta property="og:url" content={url} />
          {isBlogPost ? <meta property="og:type" content="article" /> : null}
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={image} />
          <meta property="fb:app_id" content={seo.social.fbAppID} />

          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={seo.social.twitter} />
          <meta name="twitter:creator" content={seo.social.twitter} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={image} />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://ucarecdn.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Margarine&family=Source+Serif+Pro:wght@400;600;700&display=swap"
          />

          <SchemaOrg
            isBlogPost={isBlogPost}
            url={url}
            title={title}
            image={image}
            description={description}
            datePublished={datePublished}
            siteUrl={seo.siteUrl}
            author={seo.author}
            organization={seo.organization}
            defaultTitle={seo.title}
          />
          {children}
        </React.Fragment>
      );
    }}
  />
);

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  postData: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      frontmatter: PropTypes.any,
      excerpt: PropTypes.any,
    }),
  }),
  frontmatter: PropTypes.object,
  postImage: PropTypes.string,
};

SEO.defaultProps = {
  isBlogPost: false,
  postData: { childMarkdownRemark: {} },
  postImage: null,
};

export default SEO;
