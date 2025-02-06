import { Foto } from "./Foto"

export interface Producto {
    id: string,
    nombre: String,
    precio: number,
    departamento: string
    tipo: string
    descripcion: string
    marca: string
    consumo: string
    localizacion: string
    valor: string
    fotoUrl: string
    fotos: Foto[]
}
