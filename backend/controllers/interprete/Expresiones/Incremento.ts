import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import generateID from "../Utils/generadorID";
export class Incremento extends Expresion{
    constructor(private expresion:Expresion, line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno): Return {
        const exp = this.expresion.execute(env);

        if(exp.type == Type.NULL){
            return {value: null, type: Type.NULL};
        }else{
            if(exp.type == Type.INT || exp.type == Type.DOUBLE){
                return {value: exp.value + 1, type: exp.type};
            }else{
                return {value: null, type: Type.NULL};
            }
        }
    }

    public drawAst(): { rama: string; nodo: string } {
        const id = generateID(15);

        const nodoPrincipal = `nodoIncremento${id.toString()}`;
        const nodoExpresion = `nodoExpresion${id.toString()}`;

        let ramaIncremento = `${nodoPrincipal}[label="Incremento"];\n`;
        ramaIncremento += `${nodoExpresion}[label="Expresion"];\n`;

        const { rama, nodo } = this.expresion.drawAst();
        ramaIncremento += rama;
        ramaIncremento += `${nodoPrincipal} -> ${nodoExpresion};\n`;
        ramaIncremento += `${nodoExpresion} -> ${nodo};\n`;

        return { rama: ramaIncremento, nodo: nodoPrincipal };
      }
}