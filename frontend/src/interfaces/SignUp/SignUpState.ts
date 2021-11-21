export default interface UserSignUp {
    email: string;
    password: string;
    password2: string;
    firstName: string;
    lastName: string;
    phone: string;
    recoveryEmail: string;
    altPhone: string;
    middleName: string;
    showAlert: boolean;
    isDone: boolean;
    snackBarMsg: string;
    [key: string]: string | boolean
}