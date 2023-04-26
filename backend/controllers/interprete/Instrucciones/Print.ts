import { Instruccion } from "../Abstractas/Instruccion";
import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { printList } from "../Reportes/Printlist";
export class Print extends Instruccion{
    constructor(line:number, column:number, private expresion: Expresion){
        super(line, column);
    }

    public execute(env:Entorno){
        try{
            const value = this.expresion.execute(env);
            printList.push(value.value);
            console.log(value.value);
        }catch(error){
            console.log(error);
        }
        
    }
}