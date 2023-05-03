import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import generateID from "../Utils/generadorID";
export class toString extends Expresion{
    constructor(private expresion:Expresion, line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno): Return {
        const exp = this.expresion.execute(env);

        if(exp.type == Type.NULL){
            return {value: null, type: Type.NULL};
        }else{
            if(exp.type == Type.INT || exp.type == Type.DOUBLE){
                return {value: exp.value.toString(), type: Type.STRING};
            }else{
                return {value: null, type: Type.NULL};
            }
        }
    }

    public drawAst(): { rama: string; nodo: string } {
        const id = generateID(15);

        const nodoPrincipal = `nodoToString${id.toString()}`;
        const nodoIDPrincipal = `nodoID${id.toString()}`;

        let ramaToString = `${nodoPrincipal}[label="toString"];\n`;

        ramaToString += `${nodoPrincipal} -> ${nodoIDPrincipal};\n`;
        ramaToString += `${nodoIDPrincipal}[label="toString"];\n`;

        return { rama: ramaToString, nodo: nodoPrincipal };
    }

}