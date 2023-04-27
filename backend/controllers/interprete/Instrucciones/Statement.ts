import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Abstractas/Entorno";

export class Statement extends Instruccion {
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
        return {rama: "node", nodo: ""};
    }
}