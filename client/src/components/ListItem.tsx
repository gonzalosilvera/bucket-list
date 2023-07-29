import BinIcon from './BinIcon';
import Edit from './Edit';
import EditIcon from './EditIcon';
import TickIcon from './TickIcon'

const ListItem = ({ task }) => {
    return (
        <li className="flex items-center gap-x-2 w-full h-8 group">
            {/* <Edit/> */}
            <div className='flex items-center gap-x-2 w-full'>
                <TickIcon />
                <p className='flex-1 text-left'>{task.title}</p>
                {/* <ul className="hidden gap-x-4 group-hover:flex"> */}
                <ul className="flex gap-x-4">
                    <li>
                        <button className='bg-neutral-700'>
                            <EditIcon/>
                        </button>
                    </li>
                    <li>
                        <button className='bg-red-950'>
                            <BinIcon/>
                        </button>
                    </li>
                </ul>
            </div>
        </li>
    );
}

export default ListItem;