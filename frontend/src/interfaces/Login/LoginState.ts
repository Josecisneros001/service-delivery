export interface ErrorFields {
    email?: boolean;
    password?: boolean;
    [key: string]: boolean | undefined;
}

export interface LoginState {
    email: string;
    password: string;
    showAlert: boolean;
    isAuth: boolean;
    snackBarMsg: string;
    redirectToCreate: boolean;
    errors: ErrorFields;
}
