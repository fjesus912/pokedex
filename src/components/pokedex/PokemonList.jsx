import PokemonCard from "./PokemonCard"

const PokemonList = ({ pokemons }) => {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,_270px)] justify-center max-w-[1200px] mx-auto gap-x-6 gap-y-20 py-10 px-6">
      {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
        ))}
    </section>
  )
}
export default PokemonList