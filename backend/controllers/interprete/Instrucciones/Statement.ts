import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import { Return_Exp as Retorno } from "../Expresiones/Return";
import { Continue } from "./Continue";
import { Break } from "./Break";
import { If } from "./If";
import { For } from "./For";
import { While } from "./While";
//import { DoWhile } from "./DoWhile";
import { Funcion } from "./Funcion";
import generateID from "../Utils/generadorID";
export class Statement extends Instruccion {
    
    public recorridoAmbito: string = "";
    public breakEncontrado: boolean = false;
    public continueEncontrado: boolean = false;
    public returnEncontrado: boolean = false;
    public valorReturn: Return = {value: null, type: Type.NULL};


    constructor(private body:Array<Instruccion>, line:number, column:number){
        super(line, column);
    }

    public execute(env: Entorno) {
        const newEnv = new Entorno(env);

        for(const instrucciones of this.body){
            try{
                const ret = instrucciones.execute(newEnv);
                // si la instruccion es un return, retornar el valor
                if (ret != null && ret != undefined) {
                    return ret;
                }
                
                

            }catch(e){
                console.log("Error al ejecutar instrucciones")
            }
        }
    }

    public drawAst(): { rama: string; nodo: string; } {
        const id = generateID(15);

        const nodoPrincipal = `nodoStatement${id.toString()}`;
        const nodoIDPrincipal = `nodoID${id.toString()}`;

        let ramaStatement = `${nodoPrincipal}[label="Statement"];\n`

        for(const instrucciones of this.body){

            const codigoAST:{rama:string, nodo:string} = instrucciones.drawAst();

            ramaStatement += codigoAST.rama + "\n"

            ramaStatement += `${nodoPrincipal} -> ${codigoAST.nodo};\n`
        }

        return {rama: ramaStatement, nodo: nodoPrincipal};
    }
}