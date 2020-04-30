import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`
  return (
    <Layout>
      <div className="blog-tags">
        <h1>{tagHeader}</h1>
        <ul className="tag-list" style={{ marginTop: '30px' }}>
          {edges.map(({ node }) => {
            const { title, date } = node.frontmatter
            const { slug } = node.fields
            return (
              <div key={slug} style={{ marginTop: '20px' }}>
                <Link to={slug}>{title}</Link>
                <small>
                  <span> | {date}</span>
                </small>
              </div>
            )
          })}
        </ul>
        <span>
          <Link to="/tags">← All tags</Link>
        </span>
      </div>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
