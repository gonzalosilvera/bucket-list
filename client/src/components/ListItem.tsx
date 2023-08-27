import { Dispatch, SetStateAction, useState } from 'react';
import EditIcon from './EditIcon';
import BinIcon from './BinIcon';
import CheckIcon from './CheckIcon';

interface Tasks {
    task: {
        id: string,
        user_email: string,
        title: string,
        date: Date,
        checked: boolean
    },
    mode: string,
    getData: () => Promise<void>,
    setCreateMode: Dispatch<SetStateAction<boolean>>
}

const ListItem = ({ task, mode, getData, setCreateMode }: Tasks) => {
    const createMode = mode === "create" ? true : false;
    const [editMode, setEditMode] = useState(createMode);
    const data = {
        id: createMode ? '' : task.id,
        user_email: task.user_email,
        title: createMode ? null : task.title,
        checked: createMode ? false : task.checked,
        date: createMode ? new Date() : task.date
    }
    
    const formAction = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        editMode ? (
            mode === "create"
                ? postData()
                : editData()
        )
            : setEditMode(true)
    }

    const postData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVERURL}/list`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (response.status === 200) {
                setEditMode(false)
                getData()
            }
        } catch (err) {
            console.log(err)
        }
        setEditMode(false)
    }

    const editData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVERURL}/list/${task.id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (response.status === 200) {
                getData()
                setEditMode(false)
            }
        } catch (err) {
            console.log(err)
        }
        setEditMode(false)
    }

    const removeData = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (createMode) { setCreateMode(false) }
        else {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVERURL}/list/${task.id}`, {
                    method: "DELETE",
                })
                if (response.status === 200) {
                    getData()
                }
            } catch (error) {
                console.log(error);
            }
        }
        setEditMode(false);
    };

    const handleChange = (e: { target: { value: string | null; }; }) => {
        data.title = e.target.value;
        console.log(data);
    }

    const checkData = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        data.checked = true
        editData()
    }

    return (
        <li className="flex gap-x-2 group">
            <div className='flex items-center justify-center w-6'>
                {!createMode && (!data.checked ?
                    <button
                        className='bg-transparent shadow-none p-0'
                        onClick={checkData}
                    >
                        <CheckIcon checked={data.checked} />
                    </button>
                    : <div>
                        <CheckIcon checked={data.checked} />
                    </div>
                )}
            </div>
            <form className="flex-1 flex items-center gap-x-2 group">
                {editMode
                    ? <input
                        className='flex-1 text-left h-full text-neutral-300 bg-neutral-900 px-2 py-1 rounded-lg'
                        type="text"
                        name='title'
                        defaultValue={task.title}
                        onChange={handleChange} />
                    : <p className={`flex-1 py-1 px-2${data.checked ? ' opacity-40' : ''}`}>{task.title}</p>
                }
                {
                    !data.checked &&
                    <button
                    className='h-8 text-sm bg-transparent px-2 rounded-md shadow-none'
                    type='submit'
                    onClick={formAction}
                    >
                        <EditIcon edit={editMode} />
                    </button>
                }
            </form>
            <button onClick={removeData}>
                <BinIcon />
            </button>
        </li>
    )
}

export default ListItem;