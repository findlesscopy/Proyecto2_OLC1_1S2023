import { Entorno } from "../Abstractas/Entorno";
import { Instruccion } from "../Abstractas/Instruccion";
import { LlamadaFuncion } from "../Expresiones/LlamadaFuncion";
import generateID from "../Utils/generadorID";

export class Main extends Instruccion{
    constructor(public value:LlamadaFuncion, line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno) {
        this.value?.execute(env);
    }

    public drawAst(): { rama: string; nodo: string; } {
        const id = generateID(15);

        const nodoPrincipal = `nodoMain${id.toString()}`;
        const nodoIDPrincipal = `nodoID${id.toString()}`;

        let ramaMain = `${nodoPrincipal}[label="Main"];\n`;

        if (this.value != null) {
            const codigoAST2: { rama: string; nodo: string } =  this.value.drawAst();
            ramaMain += codigoAST2.rama + "\n";
            ramaMain += `${nodoPrincipal} -> ${codigoAST2.nodo};\n`;
        }

        return { rama: ramaMain, nodo: nodoPrincipal };
        
    }
}