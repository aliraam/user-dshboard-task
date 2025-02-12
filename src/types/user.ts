export interface User {
    name: { first: string; last: string };
    email: string;
    location: { country: string };
    picture: { medium: string };
    phone: string;
}
