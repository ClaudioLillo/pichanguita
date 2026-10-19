import { useEffect, useState } from 'react'

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
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { players} = useSelector((state: RootState) => state.players);
  const { matches} = useSelector((state: RootState) => state.matches);
  const { loading } = useSelector((state: RootState) => state.loading);
  const [menuOption, setMenuOption] = useState(token ? 2 : 0);

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

  const getNormalizedPlayers = (_players: Player[], matches: Match[]) => {
    const points: Record<string, number> = {};
    for (const match of matches) {
      for (const p of match.team1) {
        if (points[p.sk as string]){
          points[p.sk as string] += match.result.team1;
        } else {
          points[p.sk as string] = match.result.team1;
        }
      }
      for (const p of match.team2) {
        if (points[p.sk as string]){
          points[p.sk as string] += match.result.team2;
        } else {
          points[p.sk as string] = match.result.team2;
        }
      }
    }
    return points;
  }

  const points = getNormalizedPlayers(players, matches);
  console.log(points);

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
      <div key={player.name} className="table-player">
        <div className="player-name">{player.name}</div>
        <div>{points[player.sk as string]}</div>
      </div>
    ))}

    {menuOption === 1 && matches && matches.map((match: Match) => (
      <div key={match.date} className="match">
        <div>{(new Date(match.date)).toLocaleDateString()}</div>
      <div>{`${match.result.team1} - ${match.result.team2}`}</div>
      <div className="match-teams">
        <div className="match-team">
          {match.team1.map((p)=>(
            <div key={p.name}>{p.name}</div>
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
