import { Key, useEffect, useState } from 'react';
import './App.css'
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import AddIcon from './components/AddIcon';

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

  const sortedTasks = tasks?.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(a.date) - new Date(b.date));

  return (
    <div className='flex flex-col gap-y-5'>
      <ListHeader />
      <main className='wrapper'>
        <button className='block ml-auto'>
          <AddIcon />
        </button>
        <ul className='mt-4'>
          {sortedTasks?.map((task: { id: Key | null | undefined; }) => <ListItem key={task.id} task={task} />)}
        </ul>
      </main>
    </div>
  )
}

export default App