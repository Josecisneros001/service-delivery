import { Users as UsersModel } from "./models/Users";
import { ServicePhotos } from "./models/ServicePhotos";
import { Services } from "./models/Services";

export interface ServiceFoundRow {
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
    usr_id: number,
    usr_first_name: string,
    usr_last_name: string,
    usr_password: string,
    usr_email: string,
    usr_recovery_email: string,
    usr_phone_number: string,
    usr_alt_phone_number: string,
    usr_profile_picture: string,
    usr_file_id: string,
    usr_file_proof_of_address: string,
    usr_is_service_provider: number,
    usr_registered_on: string,
    service_id: number,
    photo_urls: string,
    descriptions: string,
}

export interface ServiceFound {
    service: Services;
    serviceProvider: UsersModel;
    servicePhotos: ServicePhotos[];
}
