export interface WorkHours {
    id?: number,
    user_id?: number,
    day?: number,
    hour?: number,
    duration?: number,
    registered_on?: string,
    [key: string]: string | number | undefined
};

export interface WorkHoursMultiple {
    data?: WorkHours[],
    [key: string]: WorkHours[] | undefined
};
