import './Loader.css';

type LoaderProps = {
    loading: boolean;
}

export default function Loader({ loading }: LoaderProps) {
    return (loading ?
        <div className="loader-container">
            <div className="loader">
                <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/132.png" alt="loader" />
            </div>
        </div>
        : null
    )
}