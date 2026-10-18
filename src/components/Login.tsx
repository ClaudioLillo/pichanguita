import './Login.css';

export default function Login(){
    return (
        <div className="login">
            <div className="form">
                <label htmlFor="user">Usuario</label>
                <input type="text" name="user"/>
                <label htmlFor="password">Contraseña</label>
                <input type="password" name="password"/>
            </div>
            
        </div>
    )
}