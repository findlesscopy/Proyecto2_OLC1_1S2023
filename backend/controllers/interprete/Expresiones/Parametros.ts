import { Expresion } from "../Abstractas/Expresion";
import { Return, Type } from "../Abstractas/Return";
import { Entorno } from "../Abstractas/Entorno";

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
    return { rama: "node", nodo: "" };
  }
}
