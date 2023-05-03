import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import { Instruccion } from "../Abstractas/Instruccion";    
import { Statement } from "./Statement";
import { Case } from "./Case";
import { Default } from "./Default";
import generateID from "../Utils/generadorID";

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
       const id = generateID(15);

         const nodoPrincipal = `nodoSwitch${id.toString()}`;
            const nodoIDPrincipal = `nodoID${id.toString()}`;

            const codigoAST:{rama:string, nodo:string} = this.expresion.drawAst();
            let ramaSwitch = `${nodoPrincipal}[label="Switch"];\n`

            ramaSwitch += codigoAST.rama + "\n"

            ramaSwitch += `${nodoPrincipal} -> ${codigoAST.nodo};\n`

            this.cases.forEach(caso => {
                const codigoAST2:{rama:string, nodo:string} = caso.drawAst();
                ramaSwitch += codigoAST2.rama + "\n"
                ramaSwitch += `${nodoPrincipal} -> ${codigoAST2.nodo};\n`
            }
            );

            if(this.def != null){
                const codigoAST2:{rama:string, nodo:string} = this.def.drawAst();
                ramaSwitch += codigoAST2.rama + "\n"
                ramaSwitch += `${nodoPrincipal} -> ${codigoAST2.nodo};\n`
            }

            return {rama:ramaSwitch, nodo:nodoPrincipal};
    }
    

}