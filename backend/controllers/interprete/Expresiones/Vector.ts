import { Expresion } from "../Abstractas/Expresion";
import { Type, Return } from "../Abstractas/Return";
import { Entorno } from "../Abstractas/Entorno";
import generateID from "../Utils/generadorID";
export class Vector extends Expresion{
    constructor(private tipo: Type, private id: string, private size: Expresion| number, private valores:[Expresion]|null,line: number, column: number){
        super(line,column);
    }

    public execute(env: Entorno): Return {
        
        if(this.size instanceof Expresion){
            const size = this.size.execute(env);
            if(size.type != Type.INT){
                throw {error: "El tamaño del vector debe ser un valor numerico", linea: this.line, columna: this.column}
            }
            const vector = new Array(size.value);
            if(this.valores != null){
                for(let i = 0; i < this.valores.length; i++){
                    const val = this.valores[i].execute(env);
                    if(val.type != this.tipo){
                        throw {error: "El tipo de dato no coincide con el tipo del vector", linea: this.line, columna: this.column}
                    }
                    vector[i] = val.value;
                }
            }
            env.guardar(this.id, vector, this.tipo, this.line, this.column);
        }else{
            const vector = new Array(this.size);
            if(this.valores != null){
                for(let i = 0; i < this.valores.length; i++){
                    const val = this.valores[i].execute(env);
                    if(val.type != this.tipo){
                        throw {error: "El tipo de dato no coincide con el tipo del vector", linea: this.line, columna: this.column}
                    }
                    vector[i] = val.value;
                }
            }
            env.guardar(this.id, vector, this.tipo, this.line, this.column);
        }
        
        return {value: null, type: Type.NULL};
    }
    

    public drawAst(): { rama: string; nodo: string } {
        const id = generateID(15);

        const nodoPrincipal = `nodoVector${id.toString()}`;

        let ramaVector = `${nodoPrincipal}[label="Vector"];\n`

        const nodoIDPrincipal = `nodoID${id.toString()}`;
        ramaVector += `${nodoIDPrincipal}[label="${this.id.toString()}"];\n`;

        ramaVector += `${nodoPrincipal} -> ${nodoIDPrincipal};\n`

        const nodoTipoPrincipal = `nodoTipo${id.toString()}`;
        ramaVector += `${nodoTipoPrincipal}[label="${this.tipo.toString()}"];\n`;

        ramaVector += `${nodoPrincipal} -> ${nodoTipoPrincipal};\n`

        if(this.size instanceof Expresion){
            const {rama, nodo} = this.size.drawAst();
            ramaVector += rama;
            ramaVector += `${nodoPrincipal} -> ${nodo};\n`
        }else{
            const nodoSizePrincipal = `nodoSize${id.toString()}`;
            ramaVector += `${nodoSizePrincipal}[label="${this.size.toString()}"];\n`;

            ramaVector += `${nodoPrincipal} -> ${nodoSizePrincipal};\n`
        }

        if(this.valores != null){
            const nodoValoresPrincipal = `nodoValores${id.toString()}`;
            ramaVector += `${nodoValoresPrincipal}[label="Valores"];\n`;

            ramaVector += `${nodoPrincipal} -> ${nodoValoresPrincipal};\n`

            for(let i = 0; i < this.valores.length; i++){
                const {rama, nodo} = this.valores[i].drawAst();
                ramaVector += rama;
                ramaVector += `${nodoValoresPrincipal} -> ${nodo};\n`
            }
        }

        return { rama: ramaVector, nodo: nodoPrincipal };

    }

}