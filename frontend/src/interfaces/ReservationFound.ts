import { Appointments as AppointmentsModel } from "./models/Appointments";
import { ServiceCategories as ServiceCategoriesModel } from "./models/ServiceCategories";
import { Services as ServicesModel } from "./models/Services";
import { Users as UsersModel } from "./models/Users";

export interface ReservationFound {
    service: ServicesModel;
    serviceCategory: ServiceCategoriesModel;
    user: UsersModel;
    reservation: AppointmentsModel
}

export interface AppointmentRow {
    id: number,
    user_id: number,
    service_id: number,
    timestamp: string,
    duration: number,
    address_info: string,
    location_lat: number,
    location_lng: number,
    registered_on: string,
    srv_id: number,
    srv_user_id: number,
    srv_category_id: number,
    srv_name: string,
    srv_description: string,
    srv_location_lat: number,
    srv_location_lng: number,
    srv_location_radius: number,
    srv_is_service_fee_per_hour: number,
    srv_registered_on: string,
    ctg_name: string,
    ctg_description: string,
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
}
