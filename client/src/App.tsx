import { useEffect, useState } from 'react';
import './App.css'
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'

function App() {

  const getData = async () => {
    const userEmail = 'johndow@test.com'
    const [tasks, setTasks] = useState(null);

    try {
      const response: Response = await fetch(`http://localhost:8000/list/${userEmail}`);
      const json = await response.json()
      setTasks(json)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => getData, [])

  const sortedTasks = tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className='text-center px-7 py-5 bg-neutral-800 rounded-lg shadow-lg'>
      <h1 className='text-4xl text-neutral-500'>
        Bucket List
      </h1>
      <h2 className='text-lg pt-1 text-neutral-600'>
        ( ...before it's too late )
      </h2>
      <ListHeader listName={"Holiday tick list"} />
      {sortedTasks.map(task => <ListItem key={task.id} task={task}/>)}
    </div>
  )
}

export default App
