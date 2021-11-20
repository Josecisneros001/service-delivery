export interface ServicePhotos {
    id?: number,
    service_id?: number,
    description?: string,
    photo_url?: string,
    registered_on?: string,
    [key: string]: string | number | undefined
};
