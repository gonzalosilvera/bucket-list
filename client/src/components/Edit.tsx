const Edit = ( ) => {    

    const mode: string = 'edit';

    const handleChange = () => console.log('changing');

    return ( 
        <div className="overlay">
            <div className="flex gap-x-4">
                <form className="flex gap-x-4">
                    <input
                    className="text-neutral-200 bg-neutral-600 px-4 rounded-md shadow-inner shadow-neutral-700"
                    required
                    maxLength={30}
                    placeholder="Your task goes here"
                    name="title"
                    value={""}
                    onChange={handleChange} 
                    />
                    <input className={mode} type="submit" />
                </form>
                <button className=" bg-red-900">X</button>
            </div>
        </div>
     );
}
 
export default Edit;