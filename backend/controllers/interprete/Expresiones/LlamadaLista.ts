import { Expresion } from "../Abstractas/Expresion";
import { Type, Return } from "../Abstractas/Return";
import { Entorno } from "../Abstractas/Entorno";
import generateID from "../Utils/generadorID";

export class LlamadaLista extends Expresion{
    constructor(private id:string, private index:Expresion, line:number, column:number){
        super(line,column);
    }

    public execute(env: Entorno): Return {
        const lista = env.getVar(this.id);
        if(lista != null){
            if(lista.tipo == Type.LIST){
                const index = this.index.execute(env);
                if(index.type == Type.INT){
                    if(index.value >= 0 && index.value < lista.valor.length){
                        return {value: lista.valor[index.value], type: lista.tipo};
                    }else{
                        throw new Error("Error Semantico: El indice esta fuera de los limites de la lista");
                    }
                }else{
                    throw new Error("Error Semantico: El indice debe ser un valor numerico");
                }
            }else{
                throw new Error("Error Semantico: No se puede acceder a una variable que no es lista");
            }
        }else{
            throw new Error("Error Semantico: No se puede acceder a una variable que no existe");
        }
    }

    public drawAst(): { rama: string; nodo: string } {
        const id = generateID(15);

        const nodoPrincipal = `nodoLista${id.toString()}`;
        const nodoIDPrincipal = `nodoID${id.toString()}`;

        let ramaLista = `${nodoPrincipal}[label="Lista"];\n`;

        ramaLista += `${nodoPrincipal} -> ${nodoIDPrincipal};\n`;
        ramaLista += `${nodoIDPrincipal}[label="${this.id}"];\n`;

        return { rama: ramaLista, nodo: nodoPrincipal };
    }
    
}