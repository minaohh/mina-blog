module.exports = {
  siteMetadata: {
    title: `By Mina Opada`,
    description: `I write about Tech, Startups, and Productivity. Maker 🛠, Startup Enthusiast 👩🏻‍💼, Developer 👩🏻‍💻.  Always hungry to learn and improve.`,
    author: `Mina Opada`,
    siteUrl: `https://minaopada.com`,
    social: {
      twitter: `minaopada`,
      facebook: ``,
      github: ``,
      linkedin: `carmina-opada`,
      email: `minaopada@gmail.com`,
      medium: `@minaopada`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 970,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-165290040-1`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tech, Startups, and Productivity Blog`,
        short_name: `Mina's Blog`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#333`,
        display: `minimal-ui`,
        icon: `./static/mina-icon.png`, // This path is relative to the root of the site.
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const siteUrl = site.siteMetadata.siteUrl
                const postText = `
              <div style="margin-top=55px; font-style: italic;">(This is an article posted on my blog: minaopada.com. You can read it online by <a href="${siteUrl +
                edge.node.fields.slug}">clicking here</a>.)</div>
            `

                let html = edge.node.html
                html = html
                  .replace(/href="\//g, `href="${siteUrl}/`)
                  .replace(/src="\//g, `src="${siteUrl}/`)
                  .replace(/"\/static\//g, `"${siteUrl}/static/`)
                  .replace(/,\s*\/static\//g, `,${siteUrl}/static/`)

                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.spoiler,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': html + postText }],
                })
              })
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] }
                filter: {fields: { langKey: {eq: "en"}}}
              ) {
                edges {
                  node {
                    excerpt(pruneLength: 250)
                    html
                    fields { 
                      slug   
                    }
                    frontmatter {
                      title
                      date
                      spoiler
                    }
                  }
                }
              }
            }
          `,
            output: '/rss.xml',
            title:
              'Tech, Startups, and Productivity Blog | Mina Opada RSS Feed',
          },
        ],
      },
    },
    // `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
  ],
}
