import { Entorno } from "./Entorno";
export abstract class Instruccion{
    public line : number;
    public column : number;
    constructor(line : number, column : number){
        this.line = line;
        this.column = column;
    }

    public abstract execute(env:Entorno): any;

    public abstract drawAst(): {rama: string, nodo:string};
}