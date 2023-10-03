export interface Computer {
    name?: string;
    serial?: string;
    manufacturer?: string;
    model?: string;
    ram?: string;
    location?: "mailroom" | "admin" | "client";
    _id?: string;
}