import { useDispatch } from "react-redux"
import { setTrainerName } from "../store/slices/trainerName.slice"
import { useNavigate } from "react-router-dom"

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(setTrainerName(e.target.trainerName.value))
    navigate('/pokedex')
  }

  return (
    <main className="grid h-screen grid-rows-[1fr_auto] bg-slate-100">
      <section className="grid place-content-center text-center gap-[60px] px-3">
        <div>
          <div className="mb-[68px] px-3">
            <img src="/images/logo.svg" alt="" />
          </div>
          <h3 className="font-bold text-[#FE1936] text-4xl sm:text-5xl mb-4">Hi trainer!</h3>
          <p className="font-medium text-[#302F2F] text-xl sm:text-2xl">To start, give me your name</p>
        </div>
          <form className="flex justify-center mx-auto shadow-slate-300 shadow-md" onSubmit={handleSubmit}>
            <input className="px-3 outline-none" name="trainerName" type="text" placeholder="Your name..." />
            <button className="text-white hover:bg-[#DD1A1A] bg-[#D93F3F] py-1 sm:py-3 px-6 transition-colors">Start!</button>
          </form>
      </section>
      <header>
        <div className="bg-[#DD1A1A] h-14"></div>
        <div className="bg-black h-10">
          <div className="h-[68px] w-[68px] bg-white border-8 border-black rounded-full absolute left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-content-center">
            <div className="w-9 h-9 rounded-full bg-slate-700 border-[6px] border-black"></div>
          </div>
        </div>
      </header>
    </main>
  )
}
export default Home