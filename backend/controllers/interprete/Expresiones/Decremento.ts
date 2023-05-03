import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import generateID from "../Utils/generadorID";

export class Decremento extends Expresion {
  constructor(private expresion: Expresion, line: number, column: number) {
    super(line, column);
  }

  public execute(env: Entorno): Return {
    const exp = this.expresion.execute(env);

    if (exp.type == Type.NULL) {
      return { value: null, type: Type.NULL };
    } else {
      if (exp.type == Type.INT || exp.type == Type.DOUBLE) {
        return { value: exp.value - 1, type: exp.type };
      } else {
        return { value: null, type: Type.NULL };
      }
    }
  }

  public drawAst(): { rama: string; nodo: string } {
    const id = generateID(15);

    const nodoPrincipal = `nodoDecremento${id.toString()}`;
    const nodoExpresion = `nodoExpresion${id.toString()}`;

    let ramaDecremento = `${nodoPrincipal}[label="Decremento"];\n`;
    ramaDecremento += `${nodoExpresion}[label="Expresion"];\n`;

    const { rama, nodo } = this.expresion.drawAst();
    ramaDecremento += rama;
    ramaDecremento += `${nodoPrincipal} -> ${nodoExpresion};\n`;
    ramaDecremento += `${nodoExpresion} -> ${nodo};\n`;

    return { rama: ramaDecremento, nodo: nodoPrincipal };
  }
}
