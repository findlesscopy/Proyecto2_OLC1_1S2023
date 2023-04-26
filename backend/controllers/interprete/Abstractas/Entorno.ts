import { Simbolo } from "./Simbolos";
import { Type } from "./Return";
import { printList } from "../Reportes/Printlist";
import { TablaSimbolos, ListaTabla } from "../Reportes/TablaSimbolos";

export class Entorno{
    private variables = new Map<string, Simbolo>();
    private nombre:string;
    constructor(public anterior: Entorno | null, nombre:string) {
        this.variables = new Map<string, Simbolo>();
        this.nombre = nombre
    }

    public guardar(id: string, valor:any, tipo:Type, linea:number, columna:number){
        let env: Entorno | null = this;

        if(!env.variables.has(id.toLowerCase())){
            env.variables.set(id.toLowerCase(), new Simbolo(valor, id, tipo))
            ListaTabla.push(new TablaSimbolos(id, tipo.toString(), this.nombre, linea, columna))
        }else{
            printList.push("Error, la variable" + id + " ya existe en este entorno, linea: " + linea + " columna: " + columna)
        }
    }

    public getVar(id:string):Simbolo | undefined{
        let env: Entorno | null = this;

        while(env != null){
            if(env.variables.has(id.toLowerCase())){
                return env.variables.get(id.toLowerCase());
            }
            env = env.anterior        
        }
        return undefined
    }
}