import { Compra } from "./Compra"

export interface Usuario {

    nombre: String,
    apellidos: string
    username: string
    password: string
    token: string
    rol: string[]
    rolPrincipal: string
    carrito: Compra[]
}
