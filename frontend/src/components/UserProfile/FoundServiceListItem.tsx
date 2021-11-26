import React from "react";
import "../../tailwindcss.css";

interface FoundServiceProps {
    time: string,
    service_name: string,
    location: string,
}

const FoundServiceListItem = ({time, service_name, location}:FoundServiceProps) => {

    return(
        <div className="flex justify-between p-5 mx-20 border-b-2 border-gray-500">
            {/* Left info */}
            <div className="flex flex-col">
                <p>{time} {service_name}</p>
                <p>{location}</p>
            </div>

            {/* Request button */}
            <a href="#" className="underline">Request</a>
        </div>
    );
};

export default FoundServiceListItem;