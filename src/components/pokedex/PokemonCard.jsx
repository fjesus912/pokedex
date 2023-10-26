import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { borderByType, secondBgByType } from "../../constants/pokemon"

const PokemonCard = ({ pokemonUrl }) => {

  const [pokemon, setPokemon] = useState(null)

  const firstType = pokemon?.types[0].type.name

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <Link to={`/pokedex/${pokemon?.id}`}
      className={`capitalize border-[1px] rounded-lg text-center bg-white shadow-lg shadow-slate-300 hover:-translate-y-1 transition-all ${borderByType[firstType]} group`}>
      <div className={`relative pt-10  h-[130px]`}>
        <img
          src={pokemon?.sprites.versions["generation-v"]["black-white"].front_default === null ? "/images/MissingNo.webp" : pokemon?.sprites.versions["generation-v"]["black-white"].front_default } alt=""
          className="max-w-[110px] mx-auto flex pixelated-image scale-125 absolute w-full top-0 -translate-y-2/3 left-1/2 -translate-x-1/2  transition-all"
        />

        <h3 className="text-lx font-semibold mt-2">{pokemon?.name}</h3>
        <h5 className="font-semibold text-slate-400 text-xs py-1">Nº {pokemon?.id}</h5>
        {
          <div className="flex gap-2 w-min mx-auto">
            {
              pokemon?.types.map((type) => (
                <h3 className={`rounded-full px-2 text-white text-sm font-semibold ${secondBgByType[type.type.name]}`} key={type.type.name}>{type.type.name}</h3>
              ))}
          </div>
        }
      </div>


    </Link>
  )
}
export default PokemonCard