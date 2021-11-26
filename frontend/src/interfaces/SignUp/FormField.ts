export default interface FormField {
    hasError?: boolean;
    initialValue?: string;
    label: string;
    placeholder?: string;
    onChange: Function;
    orientation: string;
    isPassword?: boolean;
    disabled?: boolean;
    type?: "INPUT" | "SELECT" | "TEXTAREA";
}