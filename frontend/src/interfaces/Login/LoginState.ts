export default interface UserLoginState {
    email: string;
    password: string;
    showAlert: boolean;
    isAuth: boolean;
    snackBarMsg: string;
    redirectToCreate: boolean;
}
