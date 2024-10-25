export const ButtonC = (props) => {
    let bgColor = props.bgColor
    let name = props.name
    let click = props.onClick
    return (
        <button className={`${bgColor} font-bold py-2 px-11 rounded-full transition shadow-lg `} onClick={click}>
            {name}
        </button>
    );
}
