import React, { useState, useEffect } from "react";
import ServiceProviderNavbar from "../ServiceProviderNavbar";
import { NavLink } from "react-router-dom";
import { Users as UsersModel } from "../../../interfaces/models/Users";
import { Users } from "../../../scripts/APIs/Users";
import { getCurrentUser } from "../../../scripts/APIs";
import ServiceCard from "../ServiceCards/ServiceCard";
import { ServiceFound, ServiceFoundRow } from "../../../interfaces/ServiceFoundRow";
import { Services } from "../../../scripts/APIs/Services";

const MyServices = () => {
  const [user, setUser] = useState<UsersModel | undefined>(undefined);
  const [servicesFound, setServicesFound] = useState<ServiceFound[]>([]);

  useEffect(() => {
    (async () => {
        const responseUser = (await Users.getById(getCurrentUser(true))).data as UsersModel;
        setUser(responseUser);

        const response = (await Services.get(getCurrentUser(true), null, null, null, null, true)).data as ServiceFoundRow[];
        setServicesFound(response.map((serviceInfo) => {
            const photo_urls = serviceInfo.photo_urls.split(',');
            const photo_desc = serviceInfo.descriptions.split(',');
            return {
                "service": {
                    id: serviceInfo.id,
                    user_id: serviceInfo.user_id,
                    category_id: serviceInfo.category_id,
                    name: serviceInfo.name,
                    description: serviceInfo.description,
                    location_lat: serviceInfo.location_lat,
                    location_lng: serviceInfo.location_lng,
                    location_radius: serviceInfo.location_radius,
                    is_service_fee_per_hour: serviceInfo.is_service_fee_per_hour,
                    registered_on: serviceInfo.registered_on,
                },
                "serviceProvider": {
                    id: serviceInfo.usr_id,
                    first_name: serviceInfo.usr_first_name,
                    last_name: serviceInfo.usr_last_name,
                    password: serviceInfo.usr_password,
                    email: serviceInfo.usr_email,
                    recovery_email: serviceInfo.usr_recovery_email,
                    phone_number: serviceInfo.usr_phone_number,
                    alt_phone_number: serviceInfo.usr_alt_phone_number,
                    profile_picture: serviceInfo.usr_profile_picture,
                    file_id: serviceInfo.usr_file_id,
                    file_proof_of_address: serviceInfo.usr_file_proof_of_address,
                    is_service_provider: serviceInfo.usr_is_service_provider,
                    registered_on: serviceInfo.usr_registered_on,
                },
                "servicePhotos": photo_urls.map((url, index)=>{
                    return {
                        description: photo_desc[index],
                        photo_url: url,
                    }
                }),
            }
        }));
    })();
  }, []);

  return (
    <>
      <ServiceProviderNavbar user={user} />
      <div className="flex flex-col justify-center align-middle w-full sm:w-2/3 mx-auto">
        <div className="relative flex text-center py-3 text-xl">
          <div className="text-3xl w-full">My Services</div>
          <NavLink className="absolute top-5 right-0 underline" to={"/service-providers/service"}>
            Add Service
          </NavLink>
        </div>
        <div className="flex w-full">
            {servicesFound.map((serviceFound, index) => {
                return (
                    <ServiceCard key={index} {...serviceFound} />
                );
            })}
            {servicesFound.length === 0
            ? <div className="w-full m-auto text-center text-xl mt-6"> No Data</div>
            : <></>}
        </div>
      </div>
    </>
  );
};

export default MyServices;
