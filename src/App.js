import React, {useState, useEffect} from 'react';
import fetch from 'node-fetch'
import './App.css';

const PageTemplate = (props) => {
  console.log({props})
  return (
  <ul>
    <li>Official Name: {props.team}</li>
    <li>Alternate Name: {props.alternate} </li>
    <li>Site: {props.stadium}</li>
    <li>URL: {props.url}</li>
    <li>Description: {props.description}</li>
  </ul>
)}


function App() {

  const [sport, setSport] = useState('default')
  const [team, setTeam] = useState('default')
  const [dataTeam, setDataTeam] = useState({})
  const [listofTeamsOnList, setListofTeamsOnList] = useState([])
  const [loading,setLoading] = useState(true)
  const [listOfTeams, setListOfTeams] = useState([])
  const [listOfSports, setListOfSports] = useState([])

  useEffect(() => {
    let unmounted = false;
    async function getSports() {
      const response = await fetch('https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=new_york')
      const json = await response.json()
      if(!unmounted){
        let {teams} = json
        const listOfSports = teams.map(item => item.strSport)
        setListOfTeams(teams);
        console.log(json)
        setListOfSports([...new Set(listOfSports)].sort())
        setLoading(false)
      }
    }
    getSports();
    return () => {
      unmounted = true
    }
  }, [])

  const handleChangeSport = e => {
    let val = e.currentTarget.value
    if(val !== "default") {
      const selectedTeams = listOfTeams.filter(item => item.strSport === val).map(item => item.strTeam)
      setSport(val)
      setListofTeamsOnList(selectedTeams)
      setTeam('default')
    }
  }

  const handleChangeOfTeam = e => {
    let val = e.currentTarget.value
    setTeam(val)
    const selectedTeam = listOfTeams.find(item => item.strTeam === val)
    console.log(selectedTeam)
    setDataTeam(selectedTeam)
  }

  return (
    <div className="App">
      <h1 class="AppTitle">New York City Sports Fan Site</h1>
      <header className="App-header">
        
        <p>Select a Sport, then pick a team!</p>
        <select disabled={loading}
        value={sport}
        onChange={handleChangeSport}>
          {[
            <option value="default">Select a sport from the list</option>,
            ...listOfSports.map(item => <option value={item}>{item}</option>)
          ]}
        </select>
        {sport === "default"
        ? (
          <p>Once you select a sport, a list of teams will be available.</p>
        )
        : (
          <>
        <h4>{sport}</h4>
        <select 
          value={team}
          onChange={handleChangeOfTeam}>
           {[
            <option value="default">Select a Team from the list</option>,
            ...listofTeamsOnList.sort().map(item => <option value={item}>{item}</option>)
          ]}
        </select>
        </>
        )
        }
        {
          team === "default" ? (null) : (<div>
            <PageTemplate 
              team={dataTeam.strTeam}
              alternate ={dataTeam.strAlternate} 
              stadium={dataTeam.strStadium}
              url={dataTeam.strWebsite}
              description={dataTeam.strDescriptionEN}
              /> 
          </div>) 
        }
      </header>
    </div>
  );
}

export default App;
