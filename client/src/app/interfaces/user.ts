export interface User {
    _id: string,
    role: string,
    warehouses: Object,
    active: boolean,
    force_password_update: boolean,
    rut: string,
    name: string,
    email: string,
    phone: string,
    salt: string,
    hash: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}
