import {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [response, setResponse] = useState();
  const [toggleButton, setToggleButton] = useState('block');
  const [testType, setTestType] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [geoPoint, setgeoPoint] = useState('');

  const fetchData = () => {
    axios.post('https://one-check-cache-prod.herokuapp.com/search/testingcenters', {
      testType,
      searchDate: searchDate,
      geoPoint: geoPoint.split(',')
  })
    .then((response) => {
      setResponse(response.data);
      setToggleButton('none');
    })
    .catch((error) => {
      console.log(error);
    })
  }

  console.log(testType, searchDate, geoPoint)

  return (
    <div className="App">
      <header className="App-header">
      <input value={testType} onInput={e => setTestType(e.target.value)} type="text"/>
      <input value={searchDate} onInput={e => setSearchDate(e.target.value)} type="text"/>
      <input value={geoPoint} onInput={e => setgeoPoint(e.target.value)} type="text"/>

      <button onClick={fetchData} style={{display: toggleButton}}>Fetch</button>
      {response ? (
        <>
          {response.map(value => (
            <p key={value.id}>{value.address}</p>
          ))}
          </>
      ): (<></>)}
    
      </header>
    </div>
  );
}

export default App;
