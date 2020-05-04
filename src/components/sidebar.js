import React from 'react'
import { Link, graphql } from 'gatsby'
import { kebabCase } from 'lodash'

import Logo from './pic.jpg'

const Sidebar = ({ allMarkdownRemark, siteMetadata }) => {
  const allTags = allMarkdownRemark.group

  return (
    <>
      <aside className="sidebar">
        <header>
          <div className="about" style={{ maginBottom: '0px' }}>
            <div className="cover-author-image">
              <Link to="/">
                <img src={Logo} alt={siteMetadata.author} />
              </Link>
            </div>
            <div className="author-name">{siteMetadata.author}</div>
            <p>{siteMetadata.description}</p>
          </div>
          <center>
            <div>
              <h5 style={{ marginBottom: '0px', marginTop: '0px' }}>
                Top <a href="/tags">Tags</a>
              </h5>
              <ul className="tags">
                {allTags
                  .sort((a, b) => b.totalCount - a.totalCount)
                  .filter(tag =>
                    ['tech', 'startup', 'productivity'].includes(
                      tag.fieldValue.toLowerCase()
                    )
                  )
                  .slice(0, 3)
                  .map(tag => (
                    <li key={tag.fieldValue} style={{ fontSize: '12px' }}>
                      <Link
                        to={`/tags/${kebabCase(tag.fieldValue)}/`}
                        className="tag"
                        style={{
                          color: '#e0e0e0',
                          paddingTop: 2,
                          paddingBottom: 2,
                        }}
                      >
                        {tag.fieldValue} ({tag.totalCount})
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </center>
        </header>
        <footer>
          <section className="contact">
            <h3 className="contact-title">Contact me</h3>
            <ul>
              {siteMetadata.social.twitter && (
                <li>
                  <a
                    href={`https://twitter.com/${siteMetadata.social.twitter}`}
                    target="_blank"
                  >
                    <i className="fa fa-twitter" aria-hidden="true" />
                  </a>
                </li>
              )}
              {siteMetadata.social.facebook && (
                <li>
                  <a
                    href={`https://facebook.com/${siteMetadata.social.facebook}`}
                    target="_blank"
                  >
                    <i className="fa fa-facebook" aria-hidden="true" />
                  </a>
                </li>
              )}
              {siteMetadata.social.github && (
                <li>
                  <a
                    href={`https://github.com/${siteMetadata.social.github}`}
                    target="_blank"
                  >
                    <i className="fa fa-github" aria-hidden="true" />
                  </a>
                </li>
              )}
              {siteMetadata.social.linkedin && (
                <li>
                  <a
                    href={`https://linkedin.com/in/${siteMetadata.social.linkedin}`}
                    target="_blank"
                  >
                    <i className="fa fa-linkedin" aria-hidden="true" />
                  </a>
                </li>
              )}
              {siteMetadata.social.medium && (
                <li>
                  <a
                    href={`https://medium.com/${siteMetadata.social.medium}`}
                    target="_blank"
                  >
                    <i className="fa fa-medium" aria-hidden="true" />
                  </a>
                </li>
              )}
              {siteMetadata.social.email && (
                <li>
                  <a
                    href={`mailto:${siteMetadata.social.email}`}
                    target="_blank"
                  >
                    <i className="fa fa-envelope-o" aria-hidden="true" />
                  </a>
                </li>
              )}

              <li>
                <a href={'https://minaopada.com/rss.xml'} target="_blank">
                  <i className="fa fa-rss" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </section>
          <div className="copyright">
            <p style={{ marginTop: '0px', marginBottom: '0px' }}>
              {new Date().getFullYear()} &copy; {siteMetadata.author}
            </p>
          </div>
        </footer>
      </aside>
    </>
  )
}

export default Sidebar

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
