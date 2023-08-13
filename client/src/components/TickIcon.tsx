interface Checked {
    checked: boolean
}
const TickIcon = ({checked}: Checked) => {
    return (
        <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 60" stroke="#a3a3a3" fill="none" strokeWidth={2}>
            <circle cx="20" cy="30" r="15" />
            {checked && <path d="M14 26.2l7 7 16-16" />}
        </svg>
    );
}

export default TickIcon;