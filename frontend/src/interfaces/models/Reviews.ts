export interface Reviews {
    id?: number,
    user_receiver_id?: number,
    user_sender_id?: number,
    service_id?: number,
    appointment_id?: number,
    comment?: string,
    rate?: number,
    registered_on?: string,
    [key: string]: string | number | undefined
};
