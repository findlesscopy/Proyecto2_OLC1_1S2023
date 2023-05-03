import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import generateID from "../Utils/generadorID";
export class toUpper extends Expresion{
    constructor(private expresion:Expresion, line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno): Return {
        const exp = this.expresion.execute(env);

        if(exp.type == Type.NULL){
            return {value: null, type: Type.NULL};
        }else{
            if(exp.type == Type.STRING){
                return {value: exp.value.toUpperCase(), type: Type.STRING};
            }else{
                return {value: null, type: Type.NULL};
            }
        }
    }

    public drawAst(): { rama: string; nodo: string } {
        const id = generateID(15);

        const nodoPrincipal = `nodoToUpper${id.toString()}`;

        let ramaToUpper = `${nodoPrincipal}[label="toUpper"];\n`;

        const {rama, nodo} = this.expresion.drawAst();

        ramaToUpper += rama;
        ramaToUpper += `${nodoPrincipal} -> ${nodo};\n`;

        return { rama: ramaToUpper, nodo: nodoPrincipal };
    }
    
}