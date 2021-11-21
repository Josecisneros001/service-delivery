export interface Users {
    id?: number,
    first_name?: string,
    last_name?: string,
    password?: string,
    email?: string,
    recovery_email?: string,
    phone_number?: string,
    alt_phone_number?: string,
    profile_picture?: string,
    file_id?: string,
    file_proof_of_address?: string,
    is_service_provider?: number,
    registered_on?: string,
    [key: string]: string | number | number | undefined
};
