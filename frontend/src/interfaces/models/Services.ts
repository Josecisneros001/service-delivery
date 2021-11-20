export interface Services {
    id?: number,
    user_id?: number,
    category_id?: number,
    name?: string,
    description?: string,
    location_lat?: number,
    location_lng?: number,
    location_radius?: number,
    is_service_fee_per_hour?: number,
    registered_on?: string
    [key: string]: string | number | undefined
};
