import { useState } from 'react';
import BinIcon from './BinIcon';
import EditIcon from './EditIcon';
import TickIcon from './TickIcon'

interface Props {
    title: string,
    checked: boolean
}

const ListItem = ({ title }: Props) => {
    const [editMode, setEditMode] = useState(false)
    // const editMode = mode === edit ? true: false
    const [data, setData] = useState({
        user_email: "",
        title: "",
        checked: "",
        date: editMode ? "" : new Date()
    })

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        e.target.type === "checkbox"
        setData(data => (
            e.target.type === "checkbox"
                ? { ...data, [name]: checked }
                : { ...data, [name]: value }))
        console.log(data);
    }

    const editItem = () => { setEditMode(!editMode) };

    const removeItem = () => {
        console.log("remove item");
        setEditMode(false);
    };


    return <li className="flex items-center gap-x-2 w-full group">
        <ul className="flex gap-x-4 w-full">
            <li className='flex items-center'>
                <input
                    type="checkbox"
                    name="checked"
                    onClick={handleChange}
                />
            </li>
            <li className='flex-1'>
                {!editMode
                    ? <p className='py-1 px-4'>{title}</p>
                    : <input
                        className='w-full text-left text-neutral-300 bg-neutral-900 px-4 py-1 rounded-lg mr-4'
                        type="text"
                        name='title'
                        defaultValue={title}
                        onChange={handleChange} />
                }
            </li>
            <li>
                <button className='bg-neutral-700' onClick={editItem}>
                    <EditIcon edit={editMode} />
                </button>
            </li>
            <li>
                <button className='bg-red-950' onClick={removeItem}>
                    <BinIcon />
                </button>
            </li>
        </ul>
    </li>
}

export default ListItem;