import React from "react";
import { NavLink } from "react-router-dom";
import { ServicePhotos } from "../../../interfaces/models/ServicePhotos";
import { Services } from "../../../interfaces/models/Services";
import { Users } from "../../../interfaces/models/Users";
import { getFileUrl } from "../../../scripts/APIs";
import Card from "../../General/Card";

interface FoundServiceProps {
    serviceProvider: Users;
    service: Services;
    servicePhotos: ServicePhotos[];
}

const ServiceCard = (props: FoundServiceProps) => {
    return(
        <Card
            className="w-full p-2.5 my-3"
            title={props.service.name}
        >
            <div className="flex justify-between p-5">
                {/* Left info */}
                <div className="flex flex-row w-full">
                    <img
                        className="h-14 w-14 rounded-full object-cover mx-4"
                        src={getFileUrl(props.serviceProvider.profile_picture)}
                        alt="a"
                    />
                    <div className="flex flex-1 flex-col">
                        <p>{props.service.description}</p>
                    </div>
                    {props.servicePhotos.map((photos)=>{
                        return(
                            <img
                                className="h-14 w-14 mx-4 flex-initial flex-end"
                                src={getFileUrl(photos.photo_url)}
                                alt="a"
                            />
                        );
                    })}
                </div>

                {/* Request button */}
                <NavLink
                    to={`/service-providers/service?id=${props.service.id}`}
                    className="bg-gray-300 px-4 py-2 h-10 rounded-full border-2 border-gray-400"
                >
                    Edit
                </NavLink>
            </div>
        </Card>
    );
};

export default ServiceCard;
