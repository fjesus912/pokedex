import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import HeaderPokeball from "../components/layouts/HeaderPokeball"
import { bgByType, secondBgByType, textByType } from "../constants/pokemon"
import { IconArrowBackUp } from "@tabler/icons-react"

const PokemonDetail = () => {

  const [pokemon, setPokemon] = useState(null)
  const [pokemonEntry, setPokemonEntry] = useState(null)
  const isAnimated = pokemon?.sprites.versions["generation-v"]["black-white"].animated.front_default
  const notAnimated = pokemon?.sprites.versions["generation-v"]["black-white"].front_default
  // const [isShinyShowed, setIsShinyShowed] = useState(false)

  // const hanldeShiny = () => {
  //   setIsShinyShowed(!setIsShinyShowed)
  // }


  const { pokemonId } = useParams()

  const getPercentStat = (statValue) => {
    const MAX_STAT_VALUE = 255
    const percentStat = ((statValue * 100) / MAX_STAT_VALUE).toFixed(1)
    return `${percentStat}%`
  }

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
      .then(({ data }) => setPokemonEntry(data))
      .catch((err) => console.log(err))
  }, [])


  const firstType = pokemon?.types[0].type.name

  console.log(pokemon)


  return (
    <main className="text-center capitalize bg-slate-100 grid gap-10 text-[#302F2F]">
      <HeaderPokeball />

      <article className="w-[min(90%,_800px)] mx-auto bg-white shadow-lg shadow-slate-300 mt-28">
        <header className={`${bgByType[firstType]} flex justify-center relative h-[100px]`}>
          <Link to={`/pokedex`} className="absolute w-min hover:bg-yellow-500 bg-yellow-400 p-3 rounded-3xl -top-32 left-0 group transition-all z-10">
            <button className="flex justify-center items-center gap-2 font-bold">
              <IconArrowBackUp />
            </button>
          </Link>
          <img className="pixelated-image mx-auto w-auto max-h-[80px] scale-[3] absolute top-0 -translate-y-2/3 flex"
            src={
              isAnimated === null ? (notAnimated === null ? "/images/MissingNo.webp" : notAnimated) : isAnimated
            }
            alt="" />
        </header>
        <div className="py-4">
          <h2 className={`text-slate-400 text-xl font-medium`}>Nº {pokemon?.id}</h2>
          {/* <button onClick={hanldeShiny}>Shiny</button> */}
          <h3 className={`${textByType[firstType]} text-4xl font-medium`}>{pokemon?.name}</h3>
        </div>
        {/* Types */}
        <div className="flex gap-2 w-min mx-auto mb-6">
          {
            pokemon?.types.map((type) => (
              <h3 className={` rounded-full py-1 px-4 font-semibold text-white ${secondBgByType[type.type.name]}`} key={type.type.name}>{type.type.name}</h3>
            ))}
        </div>
        <div className="mb-6">
          <h2 className="font-semibold">Pokedex entry</h2>
          <h3 className="px-20">{pokemonEntry?.flavor_text_entries[1].flavor_text !== undefined ? pokemonEntry?.flavor_text_entries[1].flavor_text : 'No Entry'}</h3>
        </div>

        {/* Weight & Height */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-center gap-2">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Weight</h3>
              <h4 className="bg-slate-200 rounded-full py-1 px-4">{pokemon?.weight / 10} <span className="lowercase">kg</span></h4>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Height</h3>
              <h4 className="bg-slate-200 rounded-full py-1 px-4">{pokemon?.height / 10} <span className="lowercase">m</span></h4>
            </div>
          </div>
          {/* Abilities */}
          <div className="flex justify-center items-center gap-10">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Abilities</h3>
              <div className="flex gap-2">
                {
                  pokemon?.abilities.map((ability) => (
                    <h4 className="bg-slate-200 rounded-full py-1 px-4" key={ability.ability.name}>
                      {ability.ability.name}
                    </h4>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <hr className="my-5" />
        {/* Stats */}
        <section>
          <div className="flex justify-between items-center px-16 mb-3">
            <h3 className="text-start text-3xl font-medium">Stats</h3>
            <img className="h-20" src="/images/pokeball.svg" alt="" />
          </div>
          <ul className="grid gap-4 px-16 mb-16">
            {
              pokemon?.stats.map((stat) => (
                <li className="capitalize" key={stat.stat.name}>
                  <div className="flex justify-between items-center px-3">
                    <h5 className="font-semibold">{stat.stat.name}</h5>
                    <span>{stat.base_stat}/255</span>
                  </div>
                  {/* Total bar */}
                  <div className="bg-slate-200 rounded-md h-6 overflow-hidden">
                    {/* Bar progress stat */}
                    <div style={{ width: getPercentStat(stat.base_stat) }} className={`bg-gradient-to-r from-[#FCD676] to-[#E6901E] h-full rounded-md`}>

                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </section>
      </article>

      <article className="bg-white px-16 w-[min(90%,_800px)] mx-auto mb-20 shadow-lg shadow-slate-300">
        <section className="">
          <div className="flex justify-between items-center py-1">
            <h3 className="text-start text-3xl font-medium">Movements</h3>
            <img className="h-20" src="/images/pokeball.svg" alt="" />
          </div>
          <div className="snap-y max-h-[250px] overflow-y-auto flex flex-wrap gap-x-4 gap-y-4 justify-center py-10">
            {
              pokemon?.moves.map((move) => (
                <h5 className="bg-slate-200 rounded-full w-auto py-2 px-4" key={move.move.name}>{move.move.name}</h5>
              ))}
          </div>
        </section>
      </article>
    </main>
  )
}
export default PokemonDetail

