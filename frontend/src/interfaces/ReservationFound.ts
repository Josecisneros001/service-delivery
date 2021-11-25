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
