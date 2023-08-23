import { useEffect, useState } from 'react';

import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import AddIcon from './components/AddIcon';

function App() {
  const userEmail = 'johndoe@test.com';

  interface Tasks {
    id: string,
    user_email: string,
    title: string,
    date: Date,
    checked: boolean
  }

  const [tasks, setTasks] = useState<Array<Tasks>>([]);
  const [createMode, setCreateMode] = useState<boolean>(false)

  const getData = async () => {
    try {
      const response: Response = await fetch(`http://localhost:8000/list/${userEmail}`);
      const json = await response.json()
      setTasks(json)
    } catch (error) {
      console.error(error)
    }
    createMode === true && setCreateMode(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getData() }, [])

  const sortedTasks = tasks?.sort(
    (a: Tasks, b: Tasks) =>
      Number(a.checked) - Number(b.checked) || +new Date(b.date) - +new Date(a.date)
  )

  return (
    <div className='flex flex-col gap-y-5'>
      <ListHeader />
      <main className='wrapper'>
        <button className='block ml-auto mb-4' onClick={() => setCreateMode(true)}>
          <AddIcon />
        </button>
        <ul className='flex flex-col gap-y-2'>
          {createMode && <ListItem
            mode={"create"}
            task={{
              id: '',
              user_email: userEmail,
              title: '',
              date: new Date(),
              checked: false
            }}
            getData={getData}
            setCreateMode={setCreateMode}
          />}
          {
            sortedTasks?.map((task: Tasks) => (
              <ListItem
                mode={"edit"}
                key={task.id}
                task={task}
                getData={getData}
                setCreateMode={setCreateMode}
              />
            )
            )}
        </ul>
      </main>
    </div>
  )
}

export default App