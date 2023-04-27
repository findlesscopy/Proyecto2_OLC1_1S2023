import { Expresion } from "../Abstractas/Expresion";
import { Return, Type } from "../Abstractas/Return";
import { Entorno } from "../Abstractas/Entorno";

export class Ternario extends Expresion {
  constructor(
    private condicion: Expresion,
    private verdadero: Expresion,
    private falso: Expresion,
    linea: number,
    columna: number
  ) {
    super(linea, columna);
  }

  public execute(env: Entorno): Return {
    const condicion = this.condicion.execute(env);
    if (condicion.type == Type.BOOLEAN) {
      if (condicion.value) {
        return this.verdadero.execute(env);
      } else {
        return this.falso.execute(env);
      }
    }
    return { value: null, type: Type.NULL };
  }

  public drawAst(): { rama: string; nodo: string } {
    return { rama: "node", nodo: "" };
  }
}
