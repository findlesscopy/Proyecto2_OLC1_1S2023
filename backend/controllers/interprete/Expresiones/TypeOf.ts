import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import generateID from "../Utils/generadorID";
export class Typeof extends Expresion{
    
    constructor(private expresion:Expresion, line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno): Return {
        const exp = this.expresion.execute(env);

        if(exp.type == Type.NULL){
            return {value: null, type: Type.NULL};
        }else{
            if(exp.type == Type.STRING){
                return {value: "string", type: Type.STRING};
            }else if(exp.type == Type.INT){
                return {value: "int", type: Type.STRING};
            }else if(exp.type == Type.DOUBLE){
                return {value: "double", type: Type.STRING};
            }else if(exp.type == Type.BOOLEAN){
                return {value: "boolean", type: Type.STRING};
            }else if(exp.type == Type.CHAR){
                return {value: "char", type: Type.STRING};
            }else if(exp.type == Type.VOID){
                return {value: "object", type: Type.STRING};
            }else{
                return {value: null, type: Type.NULL};
            }
        }
    }

    public drawAst(): { rama: string; nodo: string } {
        const id = generateID(15);

        const nodoPrincipal = `nodoTypeof${id.toString()}`;

        let ramaTypeof = `${nodoPrincipal}[label="Typeof"];\n`;

        let {rama, nodo} = this.expresion.drawAst();

        ramaTypeof += rama;

        ramaTypeof += `${nodoPrincipal} -> ${nodo};\n`;

        return { rama: ramaTypeof, nodo: nodoPrincipal };
    }
    
}