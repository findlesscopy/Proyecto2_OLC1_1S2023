import { Expresion } from "../Abstractas/Expresion";
import { Return, Type } from "../Abstractas/Return";
import { Entorno } from "../Abstractas/Entorno";
import { TipoLogicos } from "../Utils/TipoLogicos";
import generateID  from "../Utils/generadorID";
export class Logicos extends Expresion{
    constructor(private izq: Expresion, private der: Expresion, private operador: TipoLogicos, linea:number, columna:number) {
        super(linea, columna);
    }

    public execute(env: Entorno): Return {
        
        if(this.operador == TipoLogicos.OR){
            const op1 = this.izq.execute(env);
            const op2 = this.der.execute(env);
            if(op1.type == Type.BOOLEAN && op2.type == Type.BOOLEAN){
                return {value: op1.value || op2.value, type: Type.BOOLEAN}
            }
        }else if(this.operador == TipoLogicos.AND){
            const op1 = this.izq.execute(env);
            const op2 = this.der.execute(env);
            if(op1.type == Type.BOOLEAN && op2.type == Type.BOOLEAN){
                return {value: op1.value && op2.value, type: Type.BOOLEAN}
            }
        }else if(this.operador == TipoLogicos.NOT){
            const op2 = this.izq.execute(env);
            if(op2.type == Type.BOOLEAN){
                return {value: !op2.value, type: Type.BOOLEAN}
            }
        }

        return {value: null, type: Type.NULL}
    }

    public drawAst(): { rama: string; nodo: string; } {
        const id = generateID(15);

        const nodoPrincipal = `nodoLogicos${id.toString()}`;
        const nodoIDPrincipal = `nodoID${id.toString()}`;

        const codigoIzq:{rama:string, nodo:string} = this.izq.drawAst();
        const codigoDer:{rama:string, nodo:string} = this.der.drawAst();

        let ramaLogicos = `${nodoPrincipal}[label="Logicos"];\n`

        ramaLogicos += `${nodoIDPrincipal}[label="${this.operador}"];\n`;

        ramaLogicos += codigoIzq.rama + "\n"

        ramaLogicos += codigoDer.rama + "\n"

        ramaLogicos += `${nodoPrincipal} -> ${nodoIDPrincipal};\n`

        ramaLogicos += `${nodoIDPrincipal} -> ${codigoIzq.nodo};\n`

        ramaLogicos += `${nodoIDPrincipal} -> ${codigoDer.nodo};\n`

        return {rama: ramaLogicos, nodo: nodoPrincipal};
        
    }
}