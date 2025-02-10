import { Foto } from "./Foto"
import { Stock } from "./Stock"

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
    stocks: number
    cantidadVendidos : number
    cantidadVenta : number
    ganancias: number
}
