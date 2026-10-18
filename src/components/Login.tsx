import { useState } from 'react';
import './Login.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

export default function Login(){
    const token = localStorage.getItem("token");
    const { players: existingPlayers} = useSelector((state: RootState) => state.players);
    const [players, setPlayers] = useState<string[]>([]);
    const [player, setPlayer] = useState('');
    const [filter1, setFilter1] = useState('');
    const [filter2, setFilter2] = useState('');
    const [teams, setTeams] = useState<{1: string[], 2: string[]}>({1: [], 2: []})

    const handleLogin = () => {
        localStorage.setItem("token","12345");
        location.reload();
    }

    const handleLogout = () => {
        localStorage.clear();
        location.reload();
    }

    const handleAddPlayer = () => {
        setPlayers([...players, player])
        setPlayer('');
    }

    const handleTeamPlayer = (s: string, t: 1 | 2) => () => {
        setTeams({...teams, [t]: [...teams[t], s]})
        if (t === 1){
            setFilter1('');
        } else {
            setFilter2('');
        }
    }

    const allPlayers = [...existingPlayers.map(p=>p.name), ...players];

    const applyFilter = (filter: string) => {
        return allPlayers.filter((item)=>item.includes(filter))
    }
    return (
        <>
        {!token && <div className="login">
            <div className="form">
                <label htmlFor="user">Usuario</label>
                <input type="text" name="user"/>
                <label htmlFor="password">Contraseña</label>
                <input type="password" name="password"/>
                <div className="button" onClick={handleLogin}>Ingresar</div>
            </div>
        </div>}
        {token &&
        <div className="admin">
            <div className="players">
                {allPlayers && allPlayers.map((player)=>(
                    <div>{player}</div>
                ))}
            </div>
            <div className="admin-section">
                <label htmlFor="player">Nombre</label>
                <input type="text" name="player" onChange={(e)=>{setPlayer(e.target.value)}} value={player}/>
                <div className="button" onClick={handleAddPlayer}>Agregar jugador</div>
                
            </div>
            <div>
                <div className="teams">
                    <div className="team">
                        <div>Equipo 1</div>
                        <input type="text" name="player" onChange={(e)=>{setFilter1(e.target.value)}} value={filter1}/>
                        {filter1.length>0 && applyFilter(filter1).map((item)=>(
                            <div className="team-option" onClick={handleTeamPlayer(item, 1)}>{item}</div>
                        ))}
                        {teams[1].map((item)=>(
                            <div>{item}</div>
                        ))}
                    </div>
                    <div className="team">
                        <div>Equipo 2</div>
                        <input type="text" name="player" onChange={(e)=>{setFilter2(e.target.value)}} value={filter2}/>
                        {filter2.length>0 && applyFilter(filter2).map((item)=>(
                            <div className="team-option" onClick={handleTeamPlayer(item, 2)}>{item}</div>
                        ))}
                        {teams[2].map((item)=>(
                            <div>{item}</div>
                        ))}
                    </div>
                </div>
                <div className="button">Resgistrar partido</div>
            </div>
            
            <div className="link-button" onClick={handleLogout}>Cerrar sesión</div>
        </div>
        }
        </>
    )
}