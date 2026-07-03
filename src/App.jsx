import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <button onClick={() => setCount(count => count + 1)} className='bg-green-500 flex'>
        {count}
        </button>
      </div>
    </>
  )
}

export default App
