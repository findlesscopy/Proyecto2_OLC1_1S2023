import { Expresion } from "../Abstractas/Expresion";
import { Type as tipo, Return } from "../Abstractas/Return";

export class Primitivo extends Expresion{
    constructor(line:number, column:number, private valor: any, private tipo: tipo){
        super(line, column);
    }

    public execute():Return{
        return {value: this.valor, type: this.tipo};
    }
}