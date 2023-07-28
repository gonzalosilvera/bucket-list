import ProgressBar from './ProgressBar'
import TickIcon from './TickIcon'

const ListItem = ({ task }) => {
    return (
        <li className="flex gap-x-2">
            <TickIcon />
            <p className='flex-1 text-left'>{task.title}</p>
            {/* <ProgressBar /> */}
            <ul className="flex gap-x-2">
                <li>
                    <button>Edit</button>
                </li>
                <li>
                    <button>Delete</button>
                </li>
            </ul>
        </li>
    );
}

export default ListItem;