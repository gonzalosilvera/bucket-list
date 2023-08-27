import { Dispatch, SetStateAction } from 'react';
import LogoutIcon from './LogoutIcon';
import AddIcon from './AddIcon';
import { useCookies } from 'react-cookie';


const ListHeader = ({ setCreateMode }:
    { setCreateMode: Dispatch<SetStateAction<boolean>> }) => {
    const [,,removeCookie] = useCookies()

    const signOut = () => {
        console.log('Sign Out');
        removeCookie('Email');
        removeCookie('AuthToken');
        window.location.reload()
    };

    return (
        <header className="flex justify-between">
            <button className="w-10 bg-neutral-700 px-2" onClick={signOut}>
                <LogoutIcon />
            </button>
            <h1 className='font-black text-xl text-neutral-500 w-fit'>
                BUCKET LIST
            </h1>
            <button className="w-10 bg-neutral-700 px-2" onClick={() => setCreateMode(true)}>
                <AddIcon />
            </button>
        </header>
    );
}

export default ListHeader;