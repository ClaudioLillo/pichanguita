import { useState, type ChangeEvent } from 'react';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { createPlayer, getPlayers } from '../data/players';
import { setPlayers } from '../redux/reducers/players';
import type { Player } from '../types/player';
import { createMatch, getMatches } from '../data/matches';
import { setMatches } from '../redux/reducers/matches';
import { login } from '../data/login';

export default function Login(){
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const { players} = useSelector((state: RootState) => state.players);
    const [player, setPlayer] = useState('');
    const [filter1, setFilter1] = useState('');
    const [filter2, setFilter2] = useState('');
    const [teams, setTeams] = useState<{1: Player[], 2: Player[]}>({1: [], 2: []});
    const [playersOnTeam, setPlayersOnTeam] = useState<Record<string,boolean>>({});
    const [match, setMatch] = useState<{date: string, result: {team1: number, team2: number}}>({
        date: '',
        result: {
            team1: 0,
            team2: 0,
        }
    });
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async() => {
        const res = await login(username, password);
        localStorage.setItem("token", res.token);
        location.reload();
    }

    const handleLogout = () => {
        localStorage.clear();
        location.reload();
    }

    const handleAddPlayer = async() => {
        const res = await createPlayer({name: player});
        console.log(res);
        setPlayer('');
        const updatedPlayers = await getPlayers();
        dispatch(setPlayers(updatedPlayers));
    }

    const handleTeamPlayer = (p: Player, t: 1 | 2) => () => {
        setTeams({...teams, [t]: [...teams[t], p]})
        setPlayersOnTeam({...playersOnTeam, [p.name]: true})
        if (t === 1){
            setFilter1('');
        } else {
            setFilter2('');
        }
    }

    const removeTeamPlayer = (p: Player, t: 1 | 2) => () => {
        const updatedTeams = teams[t].filter(item => item.name !== p.name)
        setTeams({...teams, [t]: updatedTeams})
        setPlayersOnTeam({...playersOnTeam, [p.name]: false})
    }

    const applyFilter = (filter: string) => {
        return players.filter((item)=>item.name.includes(filter) && !playersOnTeam[item.name])
    }

    const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setMatch({...match, date: e.target.value})
    }

    const handleResult = (n: 1 | 2) => (e: ChangeEvent<HTMLInputElement>) => {
        const key = n === 1 ? 'team1' : 'team2';
        setMatch({...match, result: {...match.result, [key]: Number(e.target.value)}})
    };

    const handleSaveMatch = async() => {
        console.log(match);
        const res = await createMatch({
            team1: teams[1],
            team2: teams[2],
            result: match.result,
            submittedBy: 'jo',
            date: match.date,
        });
        console.log(res);
        const updatedMatches = await getMatches();
        dispatch(setMatches(updatedMatches));
    }

    return (
        <>
        {!token && <div className="login">
            <div className="form">
                <label htmlFor="user">Usuario</label>
                <input type="text" name="user" onChange={(e)=> {setUsername(e.target.value)}}/>
                <label htmlFor="password">Contraseña</label>
                <input type="password" name="password" onChange={(e)=> {setPassword(e.target.value)}}/>
                <div className="button" onClick={handleLogin}>Ingresar</div>
            </div>
        </div>}
        {token &&
        <div className="admin">
            <div className="players">
                {players && players.map((player)=>(
                    <div key={player.name}>{player.name}</div>
                ))}
            </div>
            <div className="admin-section">
                <label htmlFor="player">Nombre</label>
                <input type="text" name="player" onChange={(e)=>{setPlayer(e.target.value)}} value={player}/>
                <div className="button" onClick={handleAddPlayer}>Agregar jugador</div>
                
            </div>
            <div className="teams-wrapper">
                <div className="match-date">
                    <div>Fecha</div>
                    <input type="date" onChange={handleDate} value={match.date || ''}></input>
                </div>
                <div className="teams">
                    <div className="team">
                        <div>Equipo 1</div>
                        <input type="text" name="player" onChange={(e)=>{setFilter1(e.target.value)}} value={filter1}/>
                        {filter1.length>0 && applyFilter(filter1).map((item)=>(
                            <div key={item.name} className="team-option" onClick={handleTeamPlayer(item, 1)}>{item.name}</div>
                        ))}
                        {teams[1].map((item)=>(
                            <div key={item.name} onClick={removeTeamPlayer(item, 1)}>{item.name}</div>
                        ))}
                    </div>
                    <div className="team">
                        <div>Equipo 2</div>
                        <input type="text" name="player" onChange={(e)=>{setFilter2(e.target.value)}} value={filter2}/>
                        {filter2.length>0 && applyFilter(filter2).map((item)=>(
                            <div key={item.name} className="team-option" onClick={handleTeamPlayer(item, 2)}>{item.name}</div>
                        ))}
                        {teams[2].map((item)=>(
                            <div key={item.name} onClick={removeTeamPlayer(item, 2)}>{item.name}</div>
                        ))}
                    </div>
                </div>
                <div>
                    <div>Resultado</div>
                    <div className="result-line">
                        <input type="number" onChange={handleResult(1)} value={match?.result?.team1 || ''}></input>
                        <div>-</div>
                        <input type="number" onChange={handleResult(2)} value={match?.result?.team2 || ''}></input>
                    </div>
                </div>
                <div className="button" onClick={handleSaveMatch}>Resgistrar partido</div>
            </div>
            
            <div className="link-button" onClick={handleLogout}>Cerrar sesión</div>
        </div>
        }
        </>
    )
}