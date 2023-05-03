import { Expresion } from "../Abstractas/Expresion";
import { Type, Return } from "../Abstractas/Return";
import { Entorno } from "../Abstractas/Entorno";

export class LlamadaVector extends Expresion{
    constructor(private id: string, private index: Expresion, line: number, column: number){
        super(line,column);
    }

    public execute(env: Entorno): Return {
        const index = this.index.execute(env);
        const vector = env.getVar(this.id);
        if(vector == null){
            throw {error: "El vector no ha sido declarado", linea: this.line, columna: this.column}
        }
        if(index.type != Type.INT){
            throw {error: "El indice debe ser un valor numerico", linea: this.line, columna: this.column}
        }
        if(index.value < 0 || index.value >= vector.valor.length){
            throw {error: "El indice esta fuera del rango del vector", linea: this.line, columna: this.column}
        }
        if(vector.valor[index.value] == null || vector.valor[index.value] == undefined){

            return {value: 0, type: vector.tipo};
        }
        else{
            return {value: vector.valor[index.value], type: vector.tipo};
        }
    }

    public drawAst(): { rama: string; nodo: string } {
        return { rama: "node", nodo: "" };
    }

}