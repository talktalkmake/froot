import React from 'react'
import axios from 'axios'
import './App.css'
import { useState, useEffect } from 'react'

const api = 'http://localhost:4000/api/'
// const api = 'https://jsonplaceholder.typicode.com/users'

// Second, a (create react app) react app which has two buttons: Fruit and veg. Clicking will async call the api and process the results to be presentable, replacing the previous results.
// Consider state hooks vs reducer

// Update api to store fruit and veg in memory, with mutating methods to allow the addition of more fruit. No need to worry about update or delete for now.
// Update front end to allow input, calling of api to add whichever, and then update the local view (whichever was visible, fruit or veg), by calling the api again.
// Write every logical step on paper FIRST for the whole solution before touching any code

function App() {
  
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('getFruit')
  const [newName, setNewName] = useState('')

  
  async function fetchAPI(){
    await axios(api + filter)
      .then(response => setData(response.data))
      .catch(error => console.error(`Fetching the API didn't work: ${error}`))
  }

  async function addNew(type){
    await axios.post(`${api}add/${type}`, { newName })
      .then(response => setData(response.data))
      .catch(error => console.error(`Unable to post new ${type}`))
  }

  useEffect(() => {
    fetchAPI()
  }, [filter])

  return (
    <div className="App">
      <h1>{filter}</h1>
      <section className='flex flex-row'>
        <button disabled={filter === 'getFruit'} onClick={() => setFilter('getFruit')}>Fruit</button>
        <button disabled={filter === 'getVeg'} onClick={() => setFilter('getVeg')}>Veg</button>
      </section>
      <div className='results'>
        <ul className='list'>
          {data.map((fruit, i) => <li key={i}>{fruit.name} ({fruit.age} days old / beauty: {fruit.beauty})</li>)}
        </ul>
      </div>
      <h3>Add a new fruit or veg</h3>
      <input type='text' onChange={(e) => setNewName(e.target.value)} />
      <section className='flex flex-row'>
        {filter === 'getFruit' && <button onClick={() => addNew('fruit')}>Add New Fruit</button>}
        {filter === 'getVeg' && <button onClick={() => addNew('veg')}>Add New Veg</button>}
      </section>
    </div>
  );
}

export default App;
