import { Instruccion } from "../Abstractas/Instruccion";
import { Expresion } from "../Abstractas/Expresion";

export class Print extends Instruccion{
    constructor(line:number, column:number, private expresion: Expresion){
        super(line, column);
    }

    public execute(){
        const value = this.expresion.execute();
        console.log("Accediendo al metodo de imprimir");
    }
}