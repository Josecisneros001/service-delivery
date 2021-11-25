import React, { useEffect, useState } from "react";
import UsersNavbar from "../UsersNavbar";
import FoundServiceListItem from "./FoundServiceListItem";
import { Users as UsersModel } from "../../../interfaces/models/Users";
import { getCurrentUser } from "../../../scripts/APIs";
import { Users } from "../../../scripts/APIs/Users";
import { Services as ServicesModel } from "../../../interfaces/models/Services";
import Map from "../../General/Map";
import Slider from "../../General/Slider";
import { ServiceCategories as ServiceCategoriesModel } from "../../../interfaces/models/ServiceCategories";
import { ServiceCategories } from "../../../scripts/APIs/ServiceCategories";
import { ServicePhotos } from "../../../interfaces/models/ServicePhotos";
import { Services } from "../../../scripts/APIs/Services";

interface UserProfileProps {
}

interface ServiceFoundRow {
    id: number,
    user_id: number,
    category_id: number,
    name: string,
    description: string,
    location_lat: number,
    location_lng: number,
    location_radius: number,
    is_service_fee_per_hour: number,
    registered_on: string,
    first_name: string,
    last_name: string,
    password: string,
    email: string,
    recovery_email: string,
    phone_number: string,
    alt_phone_number: string,
    profile_picture: string,
    file_id: string,
    file_proof_of_address: string,
    is_service_provider: number,
    service_id: number,
    photo_urls: string,
    descriptions: string,
}

interface ServiceFound {
    service: ServicesModel;
    serviceProvider: UsersModel;
    servicePhotos: ServicePhotos[];
}

const UserHomePage = (props: UserProfileProps) => {
    const [searchCategory, setSearchCategory] = useState(-1);
    const [errorSearch, setErrorSearch] = useState(false);
    const [user, setUser] = useState<UsersModel | undefined>(undefined);
    const [serviceCategories, setServiceCategories] = useState<ServiceCategoriesModel[]>([]);
    const [servicesFound, setServicesFound] = useState<ServiceFound[]>([]);
    const [radius, setRadius] = React.useState(0);
    const [coord, setCoord] = React.useState({lat: 0, lng: 0});

    useEffect(() => {
        (async () => {
            const response = (await Users.getById(getCurrentUser(false))).data as UsersModel;
            const responseSC = (await ServiceCategories.get()).data as ServiceCategoriesModel[];
            setUser(response);
            console.log(response);
            setServiceCategories(responseSC);
        })();
    }, []);

    const handleSubmit = async () => {
        if(searchCategory === -1){
            setErrorSearch(true);
            setTimeout( () => {
                setErrorSearch(false);
            }, 5000);
            return;
        }
        const response = (await Services.get(null, searchCategory, coord.lat, coord.lng, radius, true)).data as ServiceFoundRow[];
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
                    id: serviceInfo.user_id,
                    first_name: serviceInfo.first_name,
                    last_name: serviceInfo.last_name,
                    password: serviceInfo.password,
                    email: serviceInfo.email,
                    recovery_email: serviceInfo.recovery_email,
                    phone_number: serviceInfo.phone_number,
                    alt_phone_number: serviceInfo.alt_phone_number,
                    profile_picture: serviceInfo.profile_picture,
                    file_id: serviceInfo.file_id,
                    file_proof_of_address: serviceInfo.file_proof_of_address,
                    is_service_provider: serviceInfo.is_service_provider,
                },
                "servicePhotos": photo_urls.map((url, index)=>{
                    return {
                        description: photo_desc[index],
                        photo_url: url,
                    }
                }),
            }
        }))
    };

    return (
        <>
            <UsersNavbar user={user} />

            {/* USER SERVICES INFORMATION */}
            <div className="flex flex-col justify-center align-middle w-full sm:w-2/3 mx-auto">
                <div className="relative w-full h-96 mb-28">
                    <h2 className="self-center my-3 text-2xl text-center">Search Services</h2>
                    <select 
                        className={`absolute top-18 right-0 z-50 block p-3 px-2 border-2 border-gray-400 w-44 ${errorSearch? 'border-red-600': ''}`}
                        onChange={event => {setSearchCategory(parseInt(event.target.value))}}
                    >
                        <option disabled selected value="-1">Category</option>
                        {serviceCategories.map((category) => {
                            return (
                                <option value={category.id}>
                                    {category.name}
                                </option>);
                        })}
                    </select>
                    <button 
                        type="button" 
                        className="absolute -bottom-10 right-0 bg-gray-300 px-10 rounded-full z-40 h-10 border-2 border-gray-400"
                        onClick={handleSubmit}
                    >
                            Search
                    </button>
                    <Map radius={radius} onCenterChange={setCoord} />
                    <Slider minRange={0} maxRange={10000} onChange={setRadius} />
                </div>
                <div className="flex w-full">
                    {servicesFound.map((serviceFound) => {
                        return (
                            <FoundServiceListItem  {...serviceFound} />
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default UserHomePage;