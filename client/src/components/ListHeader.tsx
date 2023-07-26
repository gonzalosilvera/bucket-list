const ListHeader = ( { listName } ) => {
    return ( 
        <>
            <h2>{listName}</h2>
            <div className="flex justify-center gap-x-1">
                <button className="bg-neutral-600 py-1 px-4 rounded-md shadow-sm">Add New</button>
            </div>
        </>
     );
}
 
export default ListHeader;