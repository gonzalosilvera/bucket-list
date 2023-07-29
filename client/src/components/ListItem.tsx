import TickIcon from './TickIcon'

const ListItem = ({ task }) => {
    return (
        <li className="flex items-center gap-x-2">
            <TickIcon />
            <p className='flex-1 text-left'>{task.title}</p>
            <ul className="flex gap-x-4">
                <li>
                    <button className='bg-neutral-700'>Edit</button>
                </li>
                <li>
                    <button className='bg-neutral-700'>Delete</button>
                </li>
            </ul>
        </li>
    );
}

export default ListItem;