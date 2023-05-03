import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import { Instruccion } from "../Abstractas/Instruccion";
import generateID from "../Utils/generadorID";

export class Continue extends Instruccion{
    constructor(line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno) {
        console.log("Continue");
    }

    public drawAst(): { rama: string; nodo: string; } {
        const id = generateID(15);

        const nodoPrincipal = `nodoContinue${id.toString()}`;
        const nodoIDPrincipal = `nodoID${id.toString()}`;

        let ramaContinue = `${nodoPrincipal}[label="Continue"];\n`;

        return { rama: ramaContinue, nodo: nodoPrincipal };
    }
    

}