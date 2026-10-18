import { shinyAvailability } from '../data/shiny';
import type { Pokemon } from '../types/match';
import './PokemonCard.css'

type PokemonCardProps = {
    pokemon: Pokemon;
    onClose: () => void;
}

export default function PokemonCard({ pokemon, onClose }: PokemonCardProps) {
    const shinyOptions = shinyAvailability(String(pokemon.id))
    return (
        <div className="pokemon-card-container">
            <div className="pokemon-card">
                <div className="pokemon-card-pokemon">
                    <img className="pokemon-card-img" src={pokemon.imgUrl} />
                    <div className="pokemon-card-id">{pokemon.name}</div>
                </div>
                <div className="shiny-info">
                    <div>{`Formas de obtener ${pokemon.name} shiny`}</div>
                    <img src={`https://db.pokemongohub.net/images/ingame/normal/pm${pokemon.id}.s.icon.png`} />
                    <div className="shiny-options">
                        {shinyOptions.found_egg && <div>• huevo</div>}
                        {shinyOptions.found_photobomb && <div>• sorpresa fotográfica</div>}
                        {shinyOptions.found_evolution && <div>• evolución</div>}
                        {shinyOptions.found_raid && <div>• incursión</div>}
                        {shinyOptions.found_research && <div>• investigación</div>}
                        {shinyOptions.found_wild && <div>• salvaje</div>}
                    </div>
                </div>
                <div className="close-btn" onClick={onClose}>Cerrar</div>
            </div>
        </div>
    )
}