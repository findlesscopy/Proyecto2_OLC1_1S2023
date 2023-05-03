import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import { Instruccion } from "../Abstractas/Instruccion";    
import { Statement } from "./Statement";

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
        return {rama: "node", nodo: ""};
    }
}