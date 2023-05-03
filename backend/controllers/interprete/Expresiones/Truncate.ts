import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import generateID from "../Utils/generadorID";
export class Truncate extends Expresion{
    constructor(private expresion:Expresion, line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno): Return {
        const exp = this.expresion.execute(env);

        if(exp.type == Type.NULL){
            return {value: null, type: Type.NULL};
        }else{
            if(exp.type == Type.DOUBLE){
                return {value: Math.trunc(exp.value), type: Type.INT};
            }else{
                return {value: null, type: Type.NULL};
            }
        }
    }

    public drawAst(): { rama: string; nodo: string } {
        const id = generateID(15);

        const nodoPrincipal = `nodoTruncate${id.toString()}`;

        let ramaTruncate = `${nodoPrincipal}[label="Truncate"];\n`;

        let {rama, nodo} = this.expresion.drawAst();

        ramaTruncate += rama;

        ramaTruncate += `${nodoPrincipal} -> ${nodo};\n`;

        return { rama: ramaTruncate, nodo: nodoPrincipal };
    }
}