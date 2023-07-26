import './App.css'
import ListHeader from './components/ListHeader'

function App() {
  return (
    <div className='text-center px-7 py-5 bg-neutral-800 rounded-lg shadow-lg'>
        <h1 className='text-4xl text-neutral-500'>
          Bucket List
          </h1>
        <h2 className='text-lg pt-1 text-neutral-600'>
          ( ...before it's too late )
          </h2>
        <ListHeader listName={"Holiday tick list"} />
    </div>
  )
}

export default App
