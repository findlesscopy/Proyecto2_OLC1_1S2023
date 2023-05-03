import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import { Instruccion } from "../Abstractas/Instruccion";    
import { Statement } from "./Statement";
import { Case } from "./Case";
import { Default } from "./Default";

export class Switch extends Instruccion{

    public return_Encontrado: boolean = false;
    public valor_Return: Return = { value: null, type: Type.VOID };
    public breakEncontrado: boolean = false;

    constructor(private expresion: Expresion, private cases: Array<Case>, private def: Default | null, line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno) {
            
            let valor = this.expresion.execute(env);
            let bandera = false;
            let contador = 0;
            this.cases.forEach(caso => {
                if(caso.valor.execute(env).value == valor.value){
                    bandera = true;
                    caso.execute(env);
                }
            });
            if(!bandera){
                if(this.def != null){
                    this.def.execute(env);
                }
            }
        
    }

    public drawAst(): { rama: string; nodo: string; } {
        return {rama: "node", nodo: ""};
    }
    

}