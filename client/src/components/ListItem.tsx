import BinIcon from './BinIcon';
import EditIcon from './EditIcon';
import TickIcon from './TickIcon'

interface Props {
    title: string,
    checked: boolean
}

const ListItem = ({ title, checked }: Props) => (
    <li className="flex items-center gap-x-2 w-full h-8 group">
        <div className='flex items-center gap-x-2 w-full'>
            <TickIcon checked={checked}/>
            <p className='flex-1 text-left'>{title}</p>
            <ul className="flex gap-x-4">
                <li>
                    <button className='bg-neutral-700'>
                        <EditIcon />
                    </button>
                </li>
                <li>
                    <button className='bg-red-950'>
                        <BinIcon />
                    </button>
                </li>
            </ul>
        </div>
    </li>
)

export default ListItem;