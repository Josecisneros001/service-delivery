import React, { useState, useEffect } from "react";
import { Users as UsersModel } from "../../../interfaces/models/Users";
import { Users } from "../../../scripts/APIs/Users";
import { getCurrentUser } from "../../../scripts/APIs";
import UsersNavbar from "../UsersNavbar";
import { AppointmentRow, ReservationFound } from "../../../interfaces/ReservationFound";
import { Appointments } from "../../../scripts/APIs/Appointments";
import Reservations from "../../General/Reservations/Reservations";

const MyServices = () => {
  const [user, setUser] = useState<UsersModel | undefined>(undefined);
  const [reservations, setReservations] = useState<ReservationFound[]>([]);
  const [reservationsPast, setReservationsPast] = useState<ReservationFound[]>([]);

  useEffect(() => {
    (async () => {
      const responseUser = (await Users.getById(getCurrentUser(false))).data as UsersModel;
      setUser(responseUser);

      const response = (await Appointments.get(getCurrentUser(false), null, null, true, true, new Date().toISOString(), null)).data as AppointmentRow[];
      const responsePast = (await Appointments.get(getCurrentUser(false), null, null, true, true, null, new Date().toISOString())).data as AppointmentRow[];
      setReservations(response.map((reservationInfo) => {
        return {
          "service": {
            id: reservationInfo.srv_id,
            user_id: reservationInfo.srv_user_id,
            category_id: reservationInfo.srv_category_id,
            name: reservationInfo.srv_name,
            description: reservationInfo.srv_description,
            location_lat: reservationInfo.srv_location_lat,
            location_lng: reservationInfo.srv_location_lng,
            location_radius: reservationInfo.srv_location_radius,
            is_service_fee_per_hour: reservationInfo.srv_is_service_fee_per_hour,
            registered_on: reservationInfo.srv_registered_on,
          },
          "serviceCategory": {
            name: reservationInfo.ctg_name,
            description: reservationInfo.ctg_description,
          },
          "user": {
            id: reservationInfo.usr_id,
            first_name: reservationInfo.usr_first_name,
            last_name: reservationInfo.usr_last_name,
            password: reservationInfo.usr_password,
            email: reservationInfo.usr_email,
            recovery_email: reservationInfo.usr_recovery_email,
            phone_number: reservationInfo.usr_phone_number,
            alt_phone_number: reservationInfo.usr_alt_phone_number,
            profile_picture: reservationInfo.usr_profile_picture,
            file_id: reservationInfo.usr_file_id,
            file_proof_of_address: reservationInfo.usr_file_proof_of_address,
            is_service_provider: reservationInfo.usr_is_service_provider,
            registered_on: reservationInfo.usr_registered_on,
          },
          "reservation": {
            id: reservationInfo.id,
            user_id: reservationInfo.user_id,
            service_id: reservationInfo.service_id,
            timestamp: reservationInfo.timestamp,
            duration: reservationInfo.duration,
            address_info: reservationInfo.address_info,
            location_lat: reservationInfo.location_lat,
            location_lng: reservationInfo.location_lng,
            registered_on: reservationInfo.registered_on,
          },
        }
      }));
      setReservationsPast(responsePast.map((reservationInfo) => {
        return {
          "service": {
            id: reservationInfo.srv_id,
            user_id: reservationInfo.srv_user_id,
            category_id: reservationInfo.srv_category_id,
            name: reservationInfo.srv_name,
            description: reservationInfo.srv_description,
            location_lat: reservationInfo.srv_location_lat,
            location_lng: reservationInfo.srv_location_lng,
            location_radius: reservationInfo.srv_location_radius,
            is_service_fee_per_hour: reservationInfo.srv_is_service_fee_per_hour,
            registered_on: reservationInfo.srv_registered_on,
          },
          "serviceCategory": {
            name: reservationInfo.ctg_name,
            description: reservationInfo.ctg_description,
          },
          "user": {
            id: reservationInfo.usr_id,
            first_name: reservationInfo.usr_first_name,
            last_name: reservationInfo.usr_last_name,
            password: reservationInfo.usr_password,
            email: reservationInfo.usr_email,
            recovery_email: reservationInfo.usr_recovery_email,
            phone_number: reservationInfo.usr_phone_number,
            alt_phone_number: reservationInfo.usr_alt_phone_number,
            profile_picture: reservationInfo.usr_profile_picture,
            file_id: reservationInfo.usr_file_id,
            file_proof_of_address: reservationInfo.usr_file_proof_of_address,
            is_service_provider: reservationInfo.usr_is_service_provider,
            registered_on: reservationInfo.usr_registered_on,
          },
          "reservation": {
            id: reservationInfo.id,
            user_id: reservationInfo.user_id,
            service_id: reservationInfo.service_id,
            timestamp: reservationInfo.timestamp,
            duration: reservationInfo.duration,
            address_info: reservationInfo.address_info,
            location_lat: reservationInfo.location_lat,
            location_lng: reservationInfo.location_lng,
            registered_on: reservationInfo.registered_on,
          },
        }
      }));
    })();
  }, []);

  return (
    <>
      <UsersNavbar user={user} />
      <div className="flex flex-col justify-center align-middle w-full sm:w-2/3 mx-auto">
        <div className="flex flex-col w-full">
          <h1 className="text-3xl mt-4">Upcoming Reservations</h1>
          <Reservations reservations={reservations} />
          <h1 className="text-3xl mt-4">Past Reservations</h1>
          <Reservations reservations={reservationsPast} />
        </div>
      </div>
    </>
  );
};

export default MyServices;
