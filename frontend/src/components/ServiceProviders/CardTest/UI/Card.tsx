import './Card.css'

function Card(props: {
    className : string,
    children: JSX.Element
}){
    const classes = 'card ' + props.className;
    return <div className={classes}>{props.children}</div>
}

export default Card;