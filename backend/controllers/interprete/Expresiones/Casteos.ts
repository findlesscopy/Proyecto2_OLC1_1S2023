import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import generateID  from "../Utils/generadorID";

export class Casteo extends Expresion {
  constructor(
    private tipo: Type,
    private expresion: Expresion,
    line: number,
    column: number
  ) {
    super(line, column);
  }

  public execute(env: Entorno): Return {
    const exp = this.expresion.execute(env);

    if (this.tipo == Type.NULL || exp.type == Type.NULL) {
      return { value: null, type: Type.NULL };
    } else {
        // Int a Double
        if(this.tipo == Type.DOUBLE && exp.type == Type.INT){
            return { value: parseFloat(exp.value.toString()), type: this.tipo}
        }
        // Double a Int
        else if(this.tipo == Type.INT && exp.type == Type.DOUBLE){
            return { value: Math.round(exp.value), type: this.tipo}
        }
        //int a String
        else if(this.tipo == Type.CHAR && exp.type == Type.INT){
            return { value: exp.value.toString(), type: this.tipo}
        }
        //Int a char
        else if(this.tipo == Type.CHAR && exp.type == Type.INT){
            return { value: String.fromCharCode(exp.value.toString()), type: this.tipo}
        }
        //Double a String
        else if(this.tipo == Type.STRING && exp.type == Type.DOUBLE){
            return { value: exp.value.toString(), type: this.tipo}
        }
        //Char a Int
        else if(this.tipo == Type.INT && exp.type == Type.CHAR){
            return { value: exp.value.charCodeAt(0), type: this.tipo}
        }
        //Char a Double
        else if(this.tipo == Type.DOUBLE && exp.type == Type.CHAR){
            return { value: parseFloat(exp.value.charCodeAt(0).toString()), type: this.tipo}
        }
        else{
            return { value: null, type: Type.NULL };
        }
    }
  }

  public drawAst(): { rama: string; nodo: string } {
    const id = generateID(15);

    const nodoPrincipal = `nodoCasteo${id.toString()}`;
    const nodoTipo = `nodoTipo${id.toString()}`;
    const nodoExpresion = `nodoExpresion${id.toString()}`;

    const ramaCasteo = `${nodoPrincipal}[label="Casteo"];\n`;

    const ramaTipo = `${nodoTipo}[label="${this.tipo}"];\n`;

    const ramaExpresion = this.expresion.drawAst();

    const ramaPrincipal = `${nodoPrincipal} -> ${nodoTipo};\n`;
    const ramaPrincipal2 = `${nodoTipo} -> ${ramaExpresion.nodo};\n`;

    return {
      rama: ramaCasteo + ramaTipo + ramaExpresion.rama + ramaPrincipal + ramaPrincipal2,
      nodo: nodoPrincipal,
    };

    
  }
}
