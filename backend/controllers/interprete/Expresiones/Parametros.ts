import { Expresion } from "../Abstractas/Expresion";
import { Return, Type } from "../Abstractas/Return";
import { Entorno } from "../Abstractas/Entorno";
import generateID from "../Utils/generadorID";
export class Parametros extends Expresion {
  constructor(
    private tipo: Type,
    private id: string,
    line: number,
    column: number
  ) {
    super(line, column);
  }

  public execute(env: Entorno): Return {
    // verificar el parametro
    return { value: this.id, type: this.tipo };
  }
  public drawAst(): { rama: string; nodo: string } {
    const id = generateID(15);

    const nodoPrincipal = `nodoParametro${id.toString()}`;
    const nodoIDPrincipal = `nodoID${id.toString()}`;

    let ramaParametro = `${nodoPrincipal}[label="Parametro"];\n`;

    ramaParametro += `${nodoPrincipal} -> ${nodoIDPrincipal};\n`;
    ramaParametro += `${nodoIDPrincipal}[label="${this.id}"];\n`;

    return { rama: ramaParametro, nodo: nodoPrincipal };
  }
}
