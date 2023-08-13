import { useState } from 'react';
import BinIcon from './BinIcon';
import EditIcon from './EditIcon';
import TickIcon from './TickIcon'

interface Props {
    title: string,
    checked: boolean
}

const ListItem = ({ title, checked }: Props) => {
    const [editMode, setEditMode] = useState(false)

    const editItem = () => { setEditMode(!editMode) };
    const checkItem = () => {
        console.log("check item");
        setEditMode(false);
    };

    const removeItem = () => {
        console.log("remove item");
        setEditMode(false);
    };


    return <li className="flex items-center gap-x-2 w-full h-8 group">
        <div className='flex items-center gap-x-4 w-full'>
            <button className="bg-transparent shadow-none" onClick={checkItem}>
                <TickIcon checked={checked} />
            </button>
            {!editMode
                ? <p className='flex-1 text-left p-2'>{title}</p>
                : <input className='flex-1 text-left text-neutral-600 bg-neutral-900 px-4 py-1 rounded-md' type="text" defaultValue={title} />
            }
            <ul className="flex gap-x-4">
                <li>
                    <button className='bg-neutral-700' onClick={editItem}>
                        {!editMode ? <EditIcon /> : "OK"}
                    </button>
                </li>
                <li>
                    <button className='bg-red-950' onClick={removeItem}>
                        <BinIcon />
                    </button>
                </li>
            </ul>
        </div>
    </li>
}

export default ListItem;