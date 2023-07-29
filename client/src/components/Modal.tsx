const Modal = ( ) => {    

    const mode: string = 'edit';

    const handleChange = () => console.log('changing');

    return ( 
        <div className="overlay">
            <div className="modal">
                <div className="flex items-center justify-between">
                    <h3>Let's { mode } your task</h3>
                    <button>X</button>
                </div>
                <form>
                    <input
                    required
                    maxLength={30}
                    placeholder="Your task goes here"
                    name="title"
                    value={""}
                    onChange={handleChange} 
                    />
                </form>
            </div>
        </div>
     );
}
 
export default Modal;