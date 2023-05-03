import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Abstractas/Entorno";
import { Expresion } from '../Abstractas/Expresion';
import { Return, Type } from "../Abstractas/Return";

export class Funcion extends Instruccion{

    public return_Encontrado: boolean = false;
    public valor_Return: Return = { value: null, type: Type.VOID };

    constructor(private tipo:Type, private id:string, public parametros:Array<Expresion>, public statement:Instruccion, line:number, column:number)
    {
        super(line, column);
    }

    public execute(env: Entorno) {
        // guardar la funcion en entorno
        env.guardarFuncion(this.id,this);
    }
    
    public drawAst(): { rama: string; nodo: string; } {
        return {rama: "node", nodo: ""};
    }
}