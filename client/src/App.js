import { useState, useEffect } from 'react'
import './App.css'
import HeaderSearchBox from './components/HeaderSearchBox'
import LocationList from './components/LocationList'
import { BASE_URL } from './constants/url'
import axios from 'axios'

function App() {
  const [searchLocation, setSearchLocation] = useState('')
  const [travelData, setTravelData] = useState([])

  async function fetchTravelData() {
    const getTravelData = await axios(`${BASE_URL}`)
    setTravelData(getTravelData.data.data)
  }

  function filterTravelList() {
    const locationTags = searchLocation ? searchLocation.split(', ') : []
    const filteredData =
      locationTags.length === 0
        ? travelData
        : travelData.filter((eachTreavel) => {
            return locationTags.every((tag) => {
              return eachTreavel.tags.some((innerTag) => innerTag.includes(tag))
            })
          })

    return filteredData
  }

  useEffect(() => {
    fetchTravelData()
  }, [])

  return (
    <div className="font-prompt flex flex-col items-center mb-20 mt-10 gap-y-4">
      <HeaderSearchBox
        searchLocation={searchLocation}
        onSetSearchLocation={setSearchLocation}
      />
      <LocationList
        travelData={filterTravelList()}
        searchLocation={searchLocation}
        onSetSearchLocation={setSearchLocation}
      />
    </div>
  )
}

export default App
