import { useEffect, useState } from 'react';
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import AddIcon from './components/AddIcon';

function App() {
  const userEmail = 'johndoe@test.com'
  const [tasks, setTasks] = useState<never[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response: Response = await fetch(`http://localhost:8000/list/${userEmail}`);
        const json = await response.json()
        setTasks(json)
      } catch (error) {
        console.error(error)
      }
    }
    getData()
  }, [])

  const sortedTasks = tasks?.sort((a: { date: string; }, b: { date: string; }) => +new Date(a.date) - +new Date(b.date));

  return (
    <div className='flex flex-col gap-y-5'>
      <ListHeader />
      <main className='wrapper'>
        <button className='block ml-auto'>
          <AddIcon />
        </button>
        <ul className='mt-4'>
          {sortedTasks?.map((task: {
            id: string, title: string;
          }) => <ListItem key={task.id} title={task.title} />)}
        </ul>
      </main>
    </div>
  )
}

export default App