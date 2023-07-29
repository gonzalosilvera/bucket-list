const Modal = () => {

    const mode: string = 'edit';

    const handleChange = () => console.log('changing');

    return (
        <div className="flex items-center justify-center absolute inset-0 backdrop-brightness-50">
            <div className="bg-neutral-800 px-7 py-5 rounded-md shadow-lg shadow-black">
                <div className="flex justify-between">
                    <h2 className="text-xl">New user</h2>
                    <button className=" bg-red-900">X</button>
                </div>
                <form className="flex gap-x-4 mt-6">
                    <input
                        className="text-neutral-200 bg-neutral-600 px-4 py-1 rounded-md shadow-inner shadow-neutral-700"
                        required
                        maxLength={30}
                        placeholder="Your task goes here"
                        name="title"
                        value={""}
                        onChange={handleChange}
                    />
                    <input className={mode} type="submit" />
                </form>
            </div>
        </div>
    );
}

export default Modal;