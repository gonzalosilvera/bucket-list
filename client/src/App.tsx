import { useEffect, useState } from 'react';
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth';
import { useCookies } from 'react-cookie';

const App = () => {
  const [cookies,,] = useCookies<string>()
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

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
      const response: Response = await fetch(`${import.meta.env.VITE_SERVERURL}/list/${userEmail}`);
      const json = await response.json()
      setTasks(json)
    } catch (error) {
      console.error(error)
    }
    createMode && setCreateMode(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { authToken && getData() }, [])

  const sortedTasks = tasks?.sort(
    (a: Tasks, b: Tasks) =>
      Number(a.checked) - Number(b.checked) || +new Date(b.date) - +new Date(a.date)
  )

  return (
    <>
      {
        authToken
          ? <div className='wrapper flex flex-col gap-y-5 h-full max-w-lg m-auto'>
            <ListHeader setCreateMode={setCreateMode} />
            <main className='flex-1'>
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
          : <Auth />
      }
    </>
  )
}

export default App