export default interface FormField {
    initialValue?: string;
    label: string;
    placeholder?: string;
    onChange: Function;
    orientation: string;
}