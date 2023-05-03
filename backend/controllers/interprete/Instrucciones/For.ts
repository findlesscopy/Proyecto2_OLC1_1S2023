import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import { Instruccion } from "../Abstractas/Instruccion";    
import { Statement } from "./Statement";
import generateID from "../Utils/generadorID";
export class For extends Instruccion{

    public return_Encontrado: boolean = false;
    public valor_Return: Return = { value: null, type: Type.VOID };
    public breakEncontrado: boolean = false;
    
    constructor(private variable: Instruccion, private condicion:Expresion, private iteracion:Expresion, public instrucciones:Statement, line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno) {
        // declarar la variable
        this.variable.execute(env);
        // contador para evitar ciclos infinitos
        let contador = 0;
        while(true){
            // obtener el  valor  de la condicion
            const condicion = this.condicion.execute(env);
            if(condicion !=null && condicion != undefined){
                if(!condicion.value){
                    break;
                }
            }
            // ejecutar el codigo
            const code = this.instrucciones.execute(env);
            if(contador > 1000){
                console.log("Error: Ciclo infinito");
                break;
            }
            
            this.iteracion.execute(env);
            // incrementar el contador
            contador++;
        }
    }

    public drawAst(): { rama: string; nodo: string; } {
        const id = generateID(15);

        const nodoPrincipal = `nodoFor${id.toString()}`;
        const nodoIDPrincipal = `nodoID${id.toString()}`;

        const codigoAST:{rama:string, nodo:string} = this.variable.drawAst();
        let ramaFor = `${nodoPrincipal}[label="For"];\n`

        ramaFor += codigoAST.rama + "\n"

        ramaFor += `${nodoPrincipal} -> ${codigoAST.nodo};\n`

        const codigoAST2:{rama:string, nodo:string} = this.condicion.drawAst();

        ramaFor += codigoAST2.rama + "\n"

        ramaFor += `${nodoPrincipal} -> ${codigoAST2.nodo};\n`

        const codigoAST3:{rama:string, nodo:string} = this.iteracion.drawAst();

        ramaFor += codigoAST3.rama + "\n"

        ramaFor += `${nodoPrincipal} -> ${codigoAST3.nodo};\n`

        const codigoAST4:{rama:string, nodo:string} = this.instrucciones.drawAst();

        ramaFor += codigoAST4.rama + "\n"

        ramaFor += `${nodoPrincipal} -> ${codigoAST4.nodo};\n`

        return {rama: ramaFor, nodo: nodoPrincipal};

        
    }
}