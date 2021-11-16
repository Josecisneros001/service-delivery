export interface Appointments {
    id?: number,
    user_id?: number,
    service_id?: number,
    timestamp?: string,
    duration?: number,
    address_info?: string,
    location_lat?: number,
    location_lng?: number,
    registered_on?: string,
    [key: string]: string | number | undefined
};
