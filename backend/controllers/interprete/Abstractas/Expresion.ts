import { Return } from "./Return";
export abstract class Expresion{
    public line : number;
    public column : number;
    constructor(line : number, column : number){
        this.line = line;
        this.column = column;
    }

    public abstract execute(): Return;
}