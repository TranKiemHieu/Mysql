export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    google_id: string;
    role: 'admin' | 'user';
}
