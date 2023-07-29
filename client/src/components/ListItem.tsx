import Edit from './Edit';
import TickIcon from './TickIcon'

const ListItem = ({ task }) => {
    return (
        <li className="flex gap-x-2">
            {/* <Edit/> */}
            <div className='flex items-center gap-x-2 w-full'>
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
            </div>
        </li>
    );
}

export default ListItem;