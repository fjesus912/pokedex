import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import PokemonList from "../components/pokedex/PokemonList"
import HeaderPokeball from "../components/layouts/HeaderPokeball"
import { paginateData } from "../utils/pagination"
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react"

const Pokedex = () => {
  //? Aquí están todos los pokemons
  const [pokemons, setPokemons] = useState([])
  const [pokemonName, setPokemonName] = useState('')
  const [types, setTypes] = useState([])
  const [currentType, setCurrentType] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const trainerName = useSelector((store) => store.trainerName)

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(pokemonName)
  )

  const { itemsInCurrentPage, lastPage, pagesInCurrentBlock, firstPage } = paginateData(pokemonsByName, currentPage)

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value.toLowerCase().trim())
  }

  const handleChangeType = (e) => {
    setCurrentType(e.target.value)
  }

  const handlePreviousPage = () => {
    const newcurrentPage = currentPage - 1
    if (newcurrentPage >= 1) {
      setCurrentPage(newcurrentPage)
    }
  }

  const handleNextPage = () => {
    const newcurrentPage = currentPage + 1
    if (newcurrentPage <= lastPage) setCurrentPage(newcurrentPage)
  }

  const handleLastPage = () => {
    const newcurrentPage = lastPage
    if (newcurrentPage <= lastPage) setCurrentPage(newcurrentPage)
  }

  const handleFirstPage = () => {
    const newcurrentPage = firstPage
    if (newcurrentPage <= lastPage) setCurrentPage(newcurrentPage)
  }

  //? Trae todos los pokemons
  useEffect(() => {
    if (currentType === "") {
      axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=1292')
        .then(({ data }) => setPokemons(data.results))
        .catch((err) => console.log(err))
    }
  }, [currentType])

  //? Trae todos lo types disponibles para los pokemons
  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/type')
      .then(({ data }) => setTypes(data.results))
      .catch((err) => console.log(err))
  }, [])

  //? Trae todos los pokemons con base a un tipo
  useEffect(() => {
    if (currentType !== "") {
      axios
        .get(`https://pokeapi.co/api/v2/type/${currentType}/`)
        .then(({ data }) => {
          setPokemons(data.pokemon.map((pokemon) => pokemon.pokemon))
        })
        .catch((err) => console.log(err))
    }
  }, [currentType])

  //? Reseteo de página acutal al cambiar de tipo
  useEffect(() => {
    setCurrentPage(1)
  }, [currentType])



  return (
    <main className="bg-slate-100">
      <HeaderPokeball />
      <section className="py-8 px-6">
        <p className="text-lg text-[#333] font-normal text-center mb-6">
          <span className="text-[#FE1936] font-bold">Welcome {trainerName}, </span>
          here you can find your favourite pokemon
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center py-6 gap-5 sm:gap-10">
          <form onSubmit={handleSubmit}>
            <div className="shadow-slate-300 shadow-md">
              <input className="outline-none px-3 py-1 sm:py-3" size={16} name="pokemonName" type="text" placeholder="Search a pokemon" />
              <button className=" text-white hover:bg-[#DD1A1A] bg-[#D93F3F] px-6 py-1 sm:py-3">Search</button>
            </div>
          </form>

          <select onChange={handleChangeType} className="capitalize shadow-slate-300 shadow-md py-1 sm:py-3 outline-none">
            <option value="">All pokemons</option>
            {types.map((type) => (
              <option value={type.name} key={type.url}>{type.name}</option>
            ))}
          </select>
        </div>
      </section>
      <PokemonList pokemons={itemsInCurrentPage} />


      <ul className="flex justify-center gap-4 flex-wrap py-10 px-3">
      {
          currentPage !== 1 && (
            <li>
              <button className="flex justify-center items-center text-white bg-black rounded-md w-10 h-10" onClick={handleFirstPage}>
                <IconChevronsLeft />
              </button>
            </li>
          )
        }
        {
          currentPage !== 1 && (
            <li>
              <button className="flex justify-center items-center text-white bg-[#DD1A1A] rounded-md w-10 h-10" onClick={handlePreviousPage}>
                <IconChevronLeft />
              </button>
            </li>
          )
        }
        {pagesInCurrentBlock.map((page) => (
          <li key={page}>
            <button
              onClick={() => setCurrentPage(page)}
              className={`p-2 rounded-md w-10 h-10 border-1 ${currentPage === page ? 'bg-[#DD1A1A] text-white' : 'bg-white text-black'}`}>{page}</button>
          </li>
        ))}
        {
          currentPage !== lastPage && (
            <li>
              <button className="flex justify-center items-center text-white bg-[#DD1A1A] rounded-md w-10 h-10" onClick={handleNextPage}>
                <IconChevronRight />
              </button>
            </li>
          )
        }
        {
          currentPage !== lastPage && (
            <li>
              <button className="flex justify-center items-center text-white bg-black rounded-md w-10 h-10" onClick={handleLastPage}>
                <IconChevronsRight />
              </button>
            </li>
          )
        }
      </ul>
    </main>
  )
}
export default Pokedex