import React from 'react'
import './index.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
  
  const [userdata, setUserdata] = useState([])
  const [index, setIndex] = useState(1)

  const getData = async () => {
    setUserdata([]) // show loading state
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=10`
    )
    setUserdata(response.data)
  }
    useEffect(() => {
      getData()
    }, [index])

  let printUserData = (
    <div className="w-full flex justify-center items-center py-20">
      <h3 className="text-white text-2xl animate-pulse">Loading…</h3>
    </div>
  )

  if (userdata.length > 0) {
    printUserData = (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {userdata.map((elem, idx) => (
          <a
            href={elem.url}
            key={idx}
            target="_blank"
            className="group block rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border border-white/10"
          >
            <div className="h-56">
              <img
                src={elem.download_url}
                alt=""
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="p-3">
              <h2 className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors">
                {elem.author}
              </h2>
            </div>
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen flex flex-col justify-between text-white px-6">

      {/* HEADER */}
      <header className="py-10">
        <h1 className="text-5xl md:text-7xl font-bold text-center tracking-tight">
          <span className="text-amber-400">Pic</span> Gallery
        </h1>
        <p className="text-center text-gray-400 mt-3 text-lg">
          A minimal, modern image gallery powered by Lorem Picsum
        </p>
      </header>

      {/* MAIN GRID */}
      <main className="grow">
        {printUserData}
      </main>

      {/* FOOTER */}
      <footer className="py-12 flex flex-col gap-6 items-center border-t border-white/40 mt-12">

        {/* Pagination */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
          <span className="text-gray-400">{index - 1}</span>
          <span className="bg-amber-400 text-black font-semibold px-4 py-1 rounded-full shadow">
            {index}
          </span>
          <span className="text-gray-400">{index + 1}</span>
        </div>

        {/* Prev / Next Buttons */}
        <div className="flex gap-5">
          <button
            onClick={() => {
              if (index > 1) setIndex(index - 1)
            }}
            className="bg-white/10 text-white border border-white/20 hover:bg-white/20 active:scale-95 px-5 py-2 rounded-lg font-semibold transition"
          >
            Previous
          </button>

          <button
            onClick={() => setIndex(index + 1)}
            className="bg-amber-400 hover:bg-amber-500 text-black active:scale-95 px-5 py-2 rounded-lg font-semibold transition"
          >
            Next
          </button>
        </div>

      </footer>
    </div>
  )
}

export default App
