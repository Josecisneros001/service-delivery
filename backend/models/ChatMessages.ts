export interface ChatMessages {
    id?: number,
    user_sender_id?: number,
    user_receiver_id?: number,
    message?: string,
    attachment_url?: string,
    registered_on?: string,
    [key: string]: string | number | undefined
};
