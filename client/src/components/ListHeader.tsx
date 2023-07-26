const ListHeader = ( { listName } ) => {
    return ( 
        <>
            <h2>{listName}</h2>
            <div className="flex justify-center gap-x-2 mt-2">
                <button className="">Add New</button>
                <button className="">Sign Out</button>
            </div>
        </>
     );
}
 
export default ListHeader;