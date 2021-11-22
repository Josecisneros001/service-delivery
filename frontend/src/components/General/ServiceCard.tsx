function ServiceCard(props: {
  title: string;
  subtitle: string;
  children: JSX.Element;
  className: string;
  backgroundColor: string;
}): JSX.Element {
  return (
    <div
      className={`shadow-xl rounded-xl ${props.className} ${props.backgroundColor}`}
    >
      <div className="flex flex-col">
        <div className="flex flex-row-reverse px-2 underline">
          <button>Edit</button>
        </div>
        <div className="text-3xl pb-3">
          <span> {props.title} </span>
        </div>
        <div className="w-full rounded-2xl bg-white">{props.children}</div>
      </div>
    </div>
  );
}

ServiceCard.defaultProps = {
  title: "",
  subtitle: "",
  children: <></>,
  className: "",
  backgroundColor: "bg-blue-200",
};

export default ServiceCard;
