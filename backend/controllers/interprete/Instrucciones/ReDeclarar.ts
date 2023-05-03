import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Abstractas/Entorno";
import { Expresion } from "../Abstractas/Expresion";
import generateID  from "../Utils/generadorID";

export class ReDeclarar extends Instruccion{
    constructor(private id: string, private valor: Expresion | null, linea: number, columna: number){
        super(linea, columna);
        this.id = id;
        this.valor = valor;
    }

    public execute(env: Entorno):any {
        if(this.valor != null){
            const val = this.valor.execute(env);
            env.actualizar_variable(this.id, val.value)
        }

    }

    public drawAst(): { rama: string; nodo: string; } {
        const id = generateID(15);

        const nodoPrincipal = `nodoDeclarar${id.toString()}`;
        const nodoIDPrincipal = `nodoID${id.toString()}`;

        if(this.valor != null){
            const codigoAST:{rama:string, nodo:string} = this.valor.drawAst();
            let ramaDeclarar = `${nodoPrincipal}[label="Declarar"];\n`

            ramaDeclarar += `${nodoIDPrincipal}[label="${this.id.toString()}"];\n`;

            ramaDeclarar += codigoAST.rama + "\n"

            ramaDeclarar += `${nodoPrincipal} -> ${nodoIDPrincipal};\n`

            ramaDeclarar += `${nodoIDPrincipal} -> ${codigoAST.nodo};\n`

            return {rama: ramaDeclarar, nodo: nodoPrincipal};
        }else{
            let ramaDeclarar = `${nodoPrincipal}[label="Declarar"];\n`

            ramaDeclarar += `${nodoIDPrincipal}[label="${this.id.toString()}"];\n`;

            ramaDeclarar += `${nodoPrincipal} -> ${nodoIDPrincipal};\n`

            return {rama: ramaDeclarar, nodo: nodoPrincipal};
        }
    }
}