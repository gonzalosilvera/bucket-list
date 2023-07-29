const ListHeader = () => {
    const signOut = () => {
        console.log('Sign Out');
    }

    return (
        <header className="flex items-end justify-between">
            <div>
                <h1 className='text-4xl text-neutral-500'>
                    Bucket List
                </h1>
                <h2 className='text-lg pt-1 text-neutral-600'>
                    ( ...before it's too late )
                </h2>
            </div>
            <ul className="flex justify-center gap-x-4 mt-2">
                <li>
                    <button >Add New</button>
                </li>
                <li>
                    <button onClick={signOut}>Sign Out</button>
                </li>
            </ul>
        </header>
    );
}

export default ListHeader;