const ListHeader = ( { listName } ) => {
    const signOut = () => {
        console.log('Sign Out');
    }
    
    return ( 
        <>
            <h2>{listName}</h2>
            <div className="flex justify-center gap-x-2 mt-2">
                <button >Add New</button>
                <button onClick={signOut}>Sign Out</button>
            </div>
        </>
     );
}
 
export default ListHeader;