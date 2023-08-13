const ListHeader = () => {
    const signOut = () => {
        console.log('Sign Out');
    };

    return (
        <>
            <header className="wrapper flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                    <h1 className='font-black text-xl text-neutral-500'>
                        BUCKET LIST
                    </h1>
                </div>
                <ul className="flex justify-center gap-x-4">
                    <li>
                        <button onClick={signOut}>Sign Out</button>
                    </li>
                </ul>
            </header>
            {/* <Modal/> */}
        </>
    );
}

export default ListHeader;