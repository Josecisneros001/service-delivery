
function Card(props: {
    title: string,
    subtitle: string,
    children: JSX.Element
    className : string,
    backgroundColor: string,
}): JSX.Element {
    return (
        <div className={`shadow-xl rounded-xl ${props.className} ${props.backgroundColor}`}>
            <div className="flex flex-col">
                <div className="text-2xl">
                    <span> {props.title} </span>
                    -
                    <span> {props.subtitle} </span>
                </div>
                <div className="w-full rounded-2xl bg-white">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

Card.defaultProps = {
    title: "",
    subtitle: "",
    children: <></>,
    className: "",
    backgroundColor: "bg-blue-100"
}

export default Card;
