// combining client-side with server side

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

function EventList({ eventList }) {
  const [events, setEvents] = useState(eventList)
  const [selectedFilter, setSelectedFilter] = useState("")
  const router = useRouter()

  useEffect(() => {
    const func = async () => {
      const response = await fetch(`http://localhost:4000/events?category=${selectedFilter}`)
      const data = await response.json()
      setEvents(data)
      router.push(`/events?category=${selectedFilter}`, undefined, { shallow: true })
    }
    if (selectedFilter) {
      func()
    }
  }, [selectedFilter])

  return (
    <>
      <select onChange={(e) => setSelectedFilter(e.target.value)} value={selectedFilter} name="" id="">
        <option value="">All</option>
        <option value="sports">Sports</option>
        <option value="food">Food</option>
      </select>
      <h1>List of events</h1>
      {events.map(event => {
        return (
          <div key={event.id}>
            <h2>
              {event.id} {event.title} {event.date} | {event.category}
            </h2>
            <p>{event.description}</p>
            <hr />
          </div>
        )
      })}
    </>
  )
}

export default EventList

export async function getServerSideProps(context) {
  const { query } = context
  const { category } = query
  const queryString = category ? 'category=sports' : ''
  const response = await fetch(`http://localhost:4000/events?${queryString}`)
  const data = await response.json()

  return {
    props: {
      eventList: data
    }
  }
}