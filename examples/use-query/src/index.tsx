import React from 'react'
import ReactDOM from 'react-dom'

import dahlia, { gql, useQuery } from 'dahlia'

dahlia.init({
  graphql: {
    endpoint: 'https://graphql-compose.herokuapp.com/user',
  },
})

const GET_USER = gql`
  query User {
    userById(_id: "57bb44dd21d2befb7ca3f010") {
      name
      gender
      age
    }
  }
`

const App = () => {
  const { loading, data, error } = useQuery(GET_USER)

  if (loading) return <div>loading...</div>
  if (error) return <div>Error!</div>

  return (
    <div className="App">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
