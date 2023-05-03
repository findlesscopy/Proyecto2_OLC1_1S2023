import { Entorno } from "../Abstractas/Entorno";
import { Type } from "../Abstractas/Return";
import { Instruccion } from "../Abstractas/Instruccion";
import generateID from "../Utils/generadorID";
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
        const id = generateID(15);

        const nodoPrincipal = `nodoDecremento${id.toString()}`;
        const nodoExpresion = `nodoExpresion${id.toString()}`;

        let ramaDecremento = `${nodoPrincipal}[label="Decremento"];\n`;
        ramaDecremento += `${nodoExpresion}[label="Expresion"];\n`;

        ramaDecremento += `${nodoPrincipal} -> ${nodoExpresion};\n`;

        return {rama: ramaDecremento, nodo: nodoPrincipal};
    }
} 
