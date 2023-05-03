import { Expresion } from "../Abstractas/Expresion";
import { Type, Return } from "../Abstractas/Return";
import { Entorno } from "../Abstractas/Entorno";
import generateID from "../Utils/generadorID";
export class Listas extends Expresion{

    constructor(private tipo:Type, private id:string,  line:number, column:number){
        super(line,column);
    } 

    public execute(env: Entorno): Return {
        env.guardar(this.id, [], Type.LIST, this.line, this.column);
        return {value: null, type: Type.LIST};
    }

    public drawAst(): { rama: string; nodo: string } {
        const id = generateID(15);

        const nodoPrincipal = `nodoLista${id.toString()}`;
        const nodoIDPrincipal = `nodoID${id.toString()}`;

        let ramaLista = `${nodoPrincipal}[label="Lista"];\n`;

        ramaLista += `${nodoPrincipal} -> ${nodoIDPrincipal};\n`;
        ramaLista += `${nodoIDPrincipal}[label="${this.id}"];\n`;

        return { rama: ramaLista, nodo: nodoPrincipal };
        
    }
        

}