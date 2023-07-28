import { useEffect, useState } from 'react';
import './App.css'
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'

function App() {
  const userEmail = 'johndoe@test.com'
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response: Response = await fetch(`http://localhost:8000/list/${userEmail}`);
      const json = await response.json()
      setTasks(json)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => getData, [])
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className='container text-center px-7 py-5 bg-neutral-800 rounded-lg shadow-lg w-full'>
      <ListHeader/>
      <ul className='mt-5'>
        {sortedTasks?.map(task => <ListItem key={task.id} task={task} />)}
      </ul>
    </div>
  )
}

export default App
