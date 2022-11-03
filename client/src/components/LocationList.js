import shareLink from '../image/shareLink.png'

const EMPTY_FUNCTION = () => {}

function LocationList({
  travelData = [], // default `travelData` with Empty Array
  onSetSearchLocation = EMPTY_FUNCTION, // default `onSetSearchLocation` with `EMPTY_FUNCTOIN`
  searchLocation = '' // default `searchLocation` with Empty String
}) {
  function handleSetSearchLocationsText(tag) {
    const locationList = searchLocation ? searchLocation.split(', ') : []
    const setOfTags = new Set([...locationList, tag])
    const uniqueLocationList = Array.from(setOfTags).join(', ')
    onSetSearchLocation(uniqueLocationList)
  }

  function renderTag(tags) {
    const tagButtons = tags.map((tag, index) => {
      return (
        <button
          key={index}
          className="underline text-slate-600 hover:text-slate-900"
          onClick={() => handleSetSearchLocationsText(tag)}
        >
          {tag}
        </button>
      )
    })
    tagButtons.splice(tags.length - 1, 0, 'และ')
    return (
      <div className="flex flex-wrap gap-x-1 text-xs">
        หมวดหมู่ : {tagButtons}
      </div>
    )
  }

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand('copy', true, text)
    }
  }

  return (
    <div className="w-full flex flex-col gap-10 items-center">
      {travelData.map((data, index) => {
        return (
          <div key={index} className=" w-[850px] h-[250px] flex gap-5 ">
            <div className="w-[350px] h-[250px]">
              <img
                className="w-[350px] h-[250px] rounded-lg"
                alt={data.description}
                src={data.photos[0]}
              />
            </div>
            <div className=" w-[450px] h-[250px] flex flex-col justify-between">
              <a href={data.url} className="text-2xl font-medium truncate">
                {data.title}
              </a>
              <h6 className="text-xs text-slate-500 overflow-hidden text-ellipsis">
                {data.description.substring(0, 200)}...
              </h6>
              <a className="text-xs text-sky-400" href={data.url}>
                อ่านต่อ <br />
              </a>
              {renderTag(data.tags)}
              <div className="flex items-end">
                <div className="w-full flex gap-3 ">
                  {data.photos?.slice(1).map((photo, index) => {
                    return (
                      <img
                        key={index}
                        className="w-28 h-28 rounded-lg"
                        alt={photo}
                        src={photo}
                      />
                    )
                  })}
                </div>
                <button
                  onClick={async (_) => {
                    await copyTextToClipboard(data.url)
                    alert(`URL: ${data.url} is copied`)
                  }}
                >
                  <img alt="Link" src={shareLink} className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default LocationList
