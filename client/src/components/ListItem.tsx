import { Dispatch, SetStateAction, useState } from 'react';
import BinIcon from './BinIcon';
import EditIcon from './EditIcon';
import { v4 as uuidv4 } from 'uuid';

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
        id: createMode ? uuidv4() : task.id,
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
            const response = await fetch('http://localhost:8000/list', {
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
            const response = await fetch(`http://localhost:8000/list/${task.id}`, {
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
                const response = await fetch(`http://localhost:8000/list/${task.id}`, {
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
    }

    const checkData = (e: { target: { checked: boolean; }; }) => {
        const checked = e.target.checked;
        data.checked = checked;
        editData()
    }

    return (
        <li className={data.checked ? 'opacity-40' : undefined}>
            <form className="flex flex-1 items-center gap-x-2 group h-8">
                <div className='flex items-center justify-end w-2'>
                    {!editMode && <input
                        type="checkbox"
                        name="checked"
                        defaultChecked={task.checked}
                        onChange={checkData}
                    />}
                </div>
                {editMode
                    ? <input
                        className='flex-1 text-left h-full text-neutral-300 bg-neutral-900 px-3 py-1 rounded-lg mx-2'
                        type="text"
                        name='title'
                        defaultValue={task.title}
                        onChange={handleChange} />
                    : <p className='flex-1 py-1 px-5'>{task.title}</p>
                }
                <button
                    type='submit'
                    className='h-full bg-neutral-700'
                    onClick={formAction}
                >
                    <EditIcon edit={editMode} />
                </button>
                <button
                    className='h-full bg-red-950'
                    onClick={removeData}
                >
                    <BinIcon />
                </button>
            </form>
        </li>
    )
}

export default ListItem;