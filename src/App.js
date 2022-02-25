import './App.css'
import { useState, useEffect } from 'react'

const api = 'http://localhost:4000/api/'
// const api = 'https://jsonplaceholder.typicode.com/users'

// Second, a (create react app) react app which has two buttons: Fruit and veg. Clicking will async call the api and process the results to be presentable, replacing the previous results.
// Consider state hooks vs reducer

function App() {
  
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('getFruit')

  
  async function fetchAPI(){
    try {
      const fetchResult = await fetch(api + filter)
      const json = await fetchResult.json()
      setData(json)
    } catch {
      console.error('Unable to retrieve produce')
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [filter])

  return (
    <div className="App">
      <header>
        <button disabled={filter === 'getFruit'} onClick={() => setFilter('getFruit')}>Fruit</button>
        <button disabled={filter === 'getVeg'} onClick={() => setFilter('getVeg')}>Veg</button>
      </header>
      <div className='results'>
        <ul className='list'>
          {data.map((fruit, i) => <li key={i}>{fruit.name}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
