import { Expresion } from "../Abstractas/Expresion";
import { Type, Return } from "../Abstractas/Return";
import { Entorno } from "../Abstractas/Entorno";

export class AddListas extends Expresion{
    constructor(private id:string, private valor:Expresion, line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno): Return {
        const val = this.valor.execute(env);
        const lista = env.getVar(this.id);

        console.log(lista);

        if(lista != null){
            if(lista.tipo == Type.LIST){
                lista.valor.push(val.value);
                env.actualizar_variable(this.id, lista.valor);
                return {value: null, type: Type.NULL};
            }else{
                throw new Error("Error Semantico: No se puede agregar elementos a una variable que no es lista");
            }
        }else{
            throw new Error("Error Semantico: No se puede agregar elementos a una variable que no existe");
        }
    }

    public drawAst(): { rama: string; nodo: string } {
        return { rama: "node", nodo: "" };
    }

}