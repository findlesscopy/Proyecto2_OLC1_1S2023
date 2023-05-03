import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import { Instruccion } from "../Abstractas/Instruccion";    
import { Statement } from "./Statement";
import generateID from "../Utils/generadorID";

export class If extends Instruccion{
    public encontrado: boolean = false
    public valor_return : Return = {value: null, type: Type.VOID};

    constructor(private condicion:Expresion, public instrucciones:Statement, private insctruccionElse: Statement | null , line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno) {
        const condicion = this.condicion.execute(env);

        if(condicion.type != Type.BOOLEAN){
            console.log("Error Semantico: La condicion no es booleana", this.line, this.column);
            return
        }

        if(condicion.value){
            this.instrucciones.execute(env);
        }else{
            if(this.insctruccionElse != null){
                this.insctruccionElse.execute(env);
            }
        }

    }

    public drawAst(): { rama: string; nodo: string; } {
        const id = generateID(15);

        const nodoPrincipal = `nodoIf${id.toString()}`;
        const nodoIDPrincipal = `nodoID${id.toString()}`;

        const codigoAST:{rama:string, nodo:string} = this.condicion.drawAst();
        let ramaIf = `${nodoPrincipal}[label="If"];\n`

        ramaIf += codigoAST.rama + "\n"

        ramaIf += `${nodoPrincipal} -> ${codigoAST.nodo};\n`

        const codigoAST2:{rama:string, nodo:string} = this.instrucciones.drawAst();

        ramaIf += codigoAST2.rama + "\n"

        ramaIf += `${nodoPrincipal} -> ${codigoAST2.nodo};\n`

        if(this.insctruccionElse != null){
            const codigoAST3:{rama:string, nodo:string} = this.insctruccionElse.drawAst();

            ramaIf += codigoAST3.rama + "\n"

            ramaIf += `${nodoPrincipal} -> ${codigoAST3.nodo};\n`
        }

        return {rama:ramaIf, nodo:nodoPrincipal};
    }
}