function HeaderSearchBox(props) {
  const { searchLocation, onSetSearchLocation } = props

  function handleSetSearchLocation(e) {
    onSetSearchLocation(e.target.value)
  }
  return (
    <div className="w-screen h-40 flex flex-col gap-4 items-center justify-center">
      <h1 className="text-4xl font-medium text-sky-500">เที่ยวไหนดี</h1>
      <div className="w-[700px] h-12  flex flex-col ">
        <label className="text-sm">ค้นหาที่เที่ยว</label>
        <input
          className="w-[700px] border-gray-400 border-solid border-b text-center outline-none placeholder:text-slate-400 placeholder:text-sm"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          value={searchLocation}
          onChange={handleSetSearchLocation}
        />
      </div>
    </div>
  )
}

export default HeaderSearchBox
