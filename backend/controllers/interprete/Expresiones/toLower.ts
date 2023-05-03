import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import generateID from "../Utils/generadorID";
export class toLower extends Expresion{
    constructor(private expresion:Expresion, line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno): Return {
        const exp = this.expresion.execute(env);

        if(exp.type == Type.NULL){
            return {value: null, type: Type.NULL};
        }else{
            if(exp.type == Type.STRING){
                return {value: exp.value.toLowerCase(), type: Type.STRING};
            }else{
                return {value: null, type: Type.NULL};
            }
        }
    }

    public drawAst(): { rama: string; nodo: string } {
        const id = generateID(15);

        const nodoPrincipal = `nodoToLower${id.toString()}`;

        let ramaToLower = `${nodoPrincipal}[label="toLower"];\n`;

        const {rama, nodo} = this.expresion.drawAst();

        ramaToLower += rama;
        ramaToLower += `${nodoPrincipal} -> ${nodo};\n`;

        return { rama: ramaToLower, nodo: nodoPrincipal };
    }
}