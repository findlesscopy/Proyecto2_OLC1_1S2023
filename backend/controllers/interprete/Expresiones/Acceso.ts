import { Expresion } from "../Abstractas/Expresion";
import { Return, Type } from "../Abstractas/Return";
import { Entorno } from "../Abstractas/Entorno";
import { printList } from "../Reportes/Printlist";
import generateID  from "../Utils/generadorID";
import { ListaTabla, TablaSimbolos } from "../Reportes/TablaSimbolos";
export class Acceso extends Expresion{
    constructor(private id:string, line:number, column:number){
        super(line, column);
    }
    
    public execute(env:Entorno): Return{
        const value = env.getVar(this.id);

        if(value){
            ListaTabla.push(new TablaSimbolos(this.id,"Acceso", env.nombreEntorno, this.line, this.column));
            return {value: value.valor, type: value.tipo};
            
        }else{
            return {value: null, type: Type.NULL};
        }
    }
    public drawAst(): { rama: string; nodo: string; } {
        const id = generateID(15);

        const nodoPrincipal = `nodoAcceso${id.toString()}`;
        const nodoIDPrincipal = `nodoID${id.toString()}`;

        let ramaAcceso = `${nodoPrincipal}[label="Acceso"];\n`

        ramaAcceso += `${nodoIDPrincipal}[label="${this.id.toString()}"];\n`;

        ramaAcceso += `${nodoPrincipal} -> ${nodoIDPrincipal};\n`

        return {rama: ramaAcceso, nodo: nodoPrincipal};
        
    }
}