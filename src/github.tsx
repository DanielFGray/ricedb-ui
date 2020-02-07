import React from 'react'
import Stringify from './Stringify'
import useJson from './useJson'
import ago from 's-ago'

const query = `
query($user: String!){
  user(login: $user) {
    repositories(first: 10, isFork: false, orderBy: {field: PUSHED_AT, direction: DESC}) {
      totalCount
      edges {
        node {
          name
          description
          url
          stargazers {
            totalCount
          }
          forks {
            totalCount
          }
          issues(states: [OPEN]) {
            totalCount
          }
          refs(refPrefix: "refs/heads/", orderBy: {direction: DESC, field: TAG_COMMIT_DATE}, first: 1) {
            edges {
              node {
                ... on Ref {
                  name
                  target {
                    ... on Commit {
                      history(first: 1) {
                        edges {
                          node {
                            ... on Commit {
                              committedDate
                              message
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`

const prettyData = (data: any) => (
  <>
    {['stars', 'forks', 'issues']
      .map(name => ({name, count: data[name]?.totalCount}))
      .filter(x => x.count > 0)
      .map(({ count, name }) => (
        <span key={name}>
          {`${count} ${count === 1 ? name.replace(/s$/, '') : name}, `}
        </span>
      ))}
  </>
)

export default function GitHub({ user }: { user: string }) {
  const [res] = useJson('https://api.github.com/graphql', {
    method: 'post',
    headers: {
      Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        user,
      },
    }),
  })

  return (
    <>
      <h3><a href={`https://github.com/${user}`}>{user}</a> on github</h3>
      {(() => {
        if (! res.data || res.loading) return 'Fetching github info...'
        const repoEdges = res.data?.data?.user?.repositories.edges
        if (! repoEdges) return 'failed to retrieve user'
        return (
          <>
            <div>{res.data.data.user.repositories.totalCount} repos</div>
            {repoEdges.map(({node}: any) => {
              const {name, url, description} = node
              return (
                <div className="repo">
                  <div>
                    <span className="name"><a href={url}>{name}</a></span>
                    {' - '}
                    {description}
                    {' - '}
                    <span className="prettyData">{prettyData(node)}</span>
                  </div>
                  <div>
                    {node.refs.edges[0] &&
                    <span className="commit">
                      <span className="">"{node.refs.edges[0].node.target.history.edges[0].node.message}"</span>
                      {' on '}
                      <span className="branch">[{node.refs.edges[0].node.name}]</span>
                      {' '}
                        <span className="time">{ago(new Date(node.refs.edges[0].node.target.history.edges[0].node.committedDate))}</span>
                    </span>}
                  </div>
                </div>
              )
            })}
          </>
        )
      })()}
    </>
  )
}
