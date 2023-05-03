export class TablaSimbolos{
    constructor(public id:string, public tipo:string, public ambito:string, public linea:number, public columna:number){
        this.id = id;
        this.tipo = tipo;
        this.ambito = ambito;
        this.linea = linea;
        this.columna = columna;
    }
}

export let ListaTabla:Array<TablaSimbolos> = []

export function limpiarTabla(){
    ListaTabla.splice(0, ListaTabla.length);
}