import { Return, Type } from './Return'

export class Simbolo {
    public valor: any
    public id: string
    public tipo: Type

    constructor(valor:any, id:string, tipo:Type) {
        this.valor = valor
        this.id = id.toLowerCase();
        this.tipo = tipo
    }
}