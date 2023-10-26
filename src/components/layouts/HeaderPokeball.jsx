const HeaderPokeball = () => {
  return (
    <header className="">
      <div className="bg-red-600 h-16">
        <div className="h-full pl-4">
          <img
            className="h-[36px] sm:h-full w-auto translate-y-4 relative z-10"
            src="/images/logo.svg"
            alt=""
          />
        </div>
      </div>
      <div className="bg-black h-12">
        <div className="h-16 w-16 bg-white border-8 border-black rounded-full absolute right-0 -translate-x-1/2 -translate-y-[12%] grid place-content-center">
          <div className="w-9 h-9 rounded-full bg-slate-700 border-[6px] border-black"></div>
        </div>
      </div>
    </header>
  )
}
export default HeaderPokeball