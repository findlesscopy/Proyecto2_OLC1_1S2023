import { Entorno } from "../Abstractas/Entorno";
import { Type } from "../Abstractas/Return";
import { Instruccion } from "../Abstractas/Instruccion";

export class DecrementoIns extends Instruccion{
    constructor(
        private nombre: string,
        line: number,
        column: number
    ){
        super(line, column)
    }

    public execute(env: Entorno) {
        var variable = env.getVar(this.nombre)

        if (variable == null || variable == undefined) {
            //no tiene que hacer la elevación y solo dar un error semántico
            console.log("Error semántico", `el decremento de un NULL no es válido`, this.line, this.column);
        }else{
            if(variable?.tipo == Type.INT || variable?.tipo == Type.DOUBLE){
                env.actualizar_variable(this.nombre, (variable.valor - 1));
            }
        }
    }
    public drawAst(): { rama: string; nodo: string; } {
        return {rama: "node", nodo: ""};
    }
} 
