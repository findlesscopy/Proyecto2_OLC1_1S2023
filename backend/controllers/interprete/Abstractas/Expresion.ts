import { Return } from "./Return";
import { Entorno } from "./Entorno";
export abstract class Expresion{
    public line : number;
    public column : number;
    constructor(line : number, column : number){
        this.line = line;
        this.column = column;
    }

    public abstract execute(env:Entorno): Return;
}