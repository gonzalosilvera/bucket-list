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
        console.table(json);
        setTasks(json)
      } catch (error) {
        console.error(error)
      }
    }
    getData()
  }, [])

  interface Tasks {
    id: string,
    user_email: string,
    title: string,
    date: string,
    checked: boolean
  }

  const sortedTasks = tasks?.sort(
    (a: { date: string; }, b: { date: string; }) =>
      +new Date(a.date) - +new Date(b.date)
  );

  const pendingTasks = sortedTasks?.filter(
    (task: Tasks) => !task.checked);

  const completedTasks = sortedTasks?.filter(
    (task: Tasks) => task.checked);

  return (
    <div className='flex flex-col gap-y-5'>
      <ListHeader />
      <main className='wrapper'>
        <button className='block ml-auto'>
          <AddIcon />
        </button>
        <ul className='mt-4 flex flex-col gap-y-2'>
          {pendingTasks?.map((task: Tasks) => <ListItem
            key={task.id}
            title={task.title}
            checked={task.checked}
          />)}
        </ul>
        <ul className='mt-2 flex flex-col gap-y-2 opacity-40'>
          {completedTasks?.map((task: Tasks) => <ListItem
            key={task.id}
            title={task.title}
            checked={task.checked}
          />)}
        </ul>
      </main>
    </div>
  )
}

export default App