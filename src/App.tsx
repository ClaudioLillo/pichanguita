import { useEffect, useState, type ChangeEvent } from 'react'

import './App.css'
import { getPlayers } from './data/players';
import { getMatches } from './data/matches';
import type { Player } from './types/player';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayers } from './redux/reducers/players';
import { setMatches } from './redux/reducers/matches';
import type { RootState } from './redux/store';
import Loader from './components/Loader';
import type { Match } from './types/match';
import Login from './components/Login';



function App() {
  const dispatch = useDispatch();
  const { players} = useSelector((state: RootState) => state.players);
  const { matches} = useSelector((state: RootState) => state.matches);
  const { loading } = useSelector((state: RootState) => state.loading);
  const [menuOption, setMenuOption] = useState(0);

  useEffect(() => {
    getPlayers().then(data => {
      dispatch(setPlayers(data))
    })
  }, [])

  useEffect(() => {
    getMatches().then(data => {
      dispatch(setMatches(data))
    })
  }, [])

  const handleMenuOption = (option: number) => () => {
    setMenuOption(option);
  }

  return (
    <div className="app">
      <Loader loading={loading} />
    <div className="menu">
      <div className="menu-option" onClick={handleMenuOption(0)}>
        Tabla
      </div>
      <div className="menu-option" onClick={handleMenuOption(1)}>
        Registros
      </div>
      <div className="menu-option" onClick={handleMenuOption(2)}>
        ...
      </div>
    </div>

    {menuOption === 0 && players && players.map((player: Player) => (
      <div key={player.name}>
      <div>{player.name}</div>
      <div>{player.points}</div>
      </div>
    ))}

    {menuOption === 1 && matches && matches.map((match: Match) => (
      <div key={match.date} className="match">
        <div>{(new Date(match.date)).toLocaleDateString()}</div>
      <div>{`${match.result.team1} - ${match.result.team2}`}</div>
      <div className="match-teams">
        <div className="match-team">
          {match.team1.map((p)=>(
            <div>{p.name}</div>
           ))}
        </div>
        <div className="match-team">
          {match.team2.map((p)=>(
            <div>{p.name}</div>
           ))}
        </div>
      </div>
      </div>
    ))}

    {menuOption === 2 && <Login/>}



    </div>
  )
}

export default App
