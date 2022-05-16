import React from 'react'



function ZenQuotes() {

function getQuote() {
  return fetch('https://zenquotes.io/api/random', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({})
  }).then(res => {
      return res.json()
  })
    .then(data => console.log(data))
    .catch(error => console.log('ERROR'))

}



  return (
    <div>ZenQuotes: 
      <button onClick={getQuote}>get quote</button>
    </div>
  )
}

export default ZenQuotes