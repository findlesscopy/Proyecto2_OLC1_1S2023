import { Instruccion } from "../Abstractas/Instruccion";
import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { printList } from "../Reportes/Printlist";
import generateID  from "../Utils/generadorID";

export class Print extends Instruccion{
    constructor(line:number, column:number, private expresion: Expresion){
        super(line, column);
    }

    public execute(env:Entorno){
        try{
            const value = this.expresion.execute(env);
            printList.push(value.value);
            console.log(value.value);
        }catch(error){
            console.log(error);
        }
    }

    public drawAst(): { rama: string; nodo: string; } {
        //Genera un id único para el nodo
        const id = generateID(15);
        //Se crea el nodo principal
        const nodoPrincipal = `nodoPrint${id.toString()}`

        let ramaPrint = `${nodoPrincipal}[label="Print"];\n`

        let codigoRama:{rama:string, nodo:string} = this.expresion.drawAst()

        ramaPrint += codigoRama.rama

        ramaPrint += `${nodoPrincipal} -> ${codigoRama.nodo};\n`

        return {rama: ramaPrint, nodo: nodoPrincipal};
    }
}