export interface Computer {
    type?: "Computer" | "Printer" | "Phone";
    name?: string;
    serial?: string;
    manufacturer?: string;
    model?: string;
    ram?: string;
    location?: "Mailroom" | "Admin" | "Client";
    _id?: string;
}
