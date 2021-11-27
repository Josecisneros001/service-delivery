export interface ErrorFields {
    firstName?: boolean;
    lastName?: boolean;
    phone?: boolean;
    altPhone?: boolean;
    email?: boolean;
    password?: boolean;
    password2?: boolean;
    recovEmail?: boolean;
    [key: string]: boolean | undefined;
}

export default interface UserSignUp {
    email: string;
    password: string;
    password2: string;
    firstName: string;
    lastName: string;
    phone: string;
    recoveryEmail: string;
    altPhone: string;
    showAlert: boolean;
    isDone: boolean;
    snackBarMsg: string;
    errors: ErrorFields;
    [key: string]: ErrorFields | string | boolean
}