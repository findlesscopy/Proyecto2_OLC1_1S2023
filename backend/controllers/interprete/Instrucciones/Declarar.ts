import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Abstractas/Entorno";
import { Expresion } from "../Abstractas/Expresion";
import { Type } from "../Abstractas/Return";

export class Declarar extends Instruccion{
    private id: string;
    private tipo: Type;
    private valor: Expresion | null;

    constructor(id: string, tipo: Type, valor: Expresion | null, linea: number, columna: number){
        super(linea, columna);
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
    }

    public execute(env: Entorno):any {
        if(this.valor != null){
            const val = this.valor.execute(env);
            env.guardar(this.id, val.value, this.tipo, this.line, this.column);
        }else{
            env.guardar(this.id, null, this.tipo, this.line, this.column)
        }
    }

}