import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Appointments } from "../../../interfaces/models/Appointments";
import { Users } from "../../../interfaces/models/Users";
import { getFileUrl } from "../../../scripts/APIs";
import DateSquare from "../DateSquare/DateSquare";
import Map from "../Map";

const Reservation = (props: {
  client: Users;
  reservation: Appointments;
}) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center p-1.5 justify-between">
        <div className="flex flex-row items-center">
          <DateSquare date={new Date(props.reservation.timestamp || '')} />
          <div className="flex flex-col">
            <div
              className="text-lg pl-5 underline cursor-pointer"
              onClick={()=>setShowMap(!showMap)}
            >
              {props.reservation.address_info}
            </div>
            <div className="text-lg pl-5">
              {new Date(props.reservation.timestamp || '').toLocaleTimeString()} - {props.reservation.duration} Minutes
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row w-full">
            <div className="flex-1 flex flex-col text-sm text-right mr-2 mt-auto">
              <span>{`${props.client.first_name} ${props.client.last_name}`}</span>
              <span>{`${props.client.email}`}</span>
              <span>{`${props.client.phone_number}`}</span>
            </div>
            <NavLink
              to={`/service-providers/chats?user_id=${props.client.id}`}
              className="flex-initial"
            >
              <img
                className="h-14 w-14 rounded-full object-cover mr-2"
                src={getFileUrl(props.client.profile_picture)}
                alt="a"
              />
            </NavLink>
          </div>
        </div>
      </div>
      <div className="w-full h-48" style={{display: showMap? 'block': 'none'}}>
        <Map fixedCenter={{lat: props.reservation.location_lat || 0, lng: props.reservation.location_lng || 0}} />
      </div>
    </div>
  );
};

export default Reservation;
