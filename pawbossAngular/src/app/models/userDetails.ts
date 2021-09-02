export interface UserDetails {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    contactNo: string;
    address: string;
    isAdmin: boolean;
    isLoggedIn: boolean;
    adoptedPetsCount: number;
    foundedPetsCount: number;
    points: number;
}