import { Expresion } from "../Abstractas/Expresion";
import { Type as tipo, Return } from "../Abstractas/Return";
import generateID  from "../Utils/generadorID";

export class Primitivo extends Expresion {
  constructor(
    line: number,
    column: number,
    private valor: any,
    private tipo: tipo
  ) {
    super(line, column);
  }
  public execute(): Return {
    switch (this.tipo) {
      case tipo.INT:
        return { value: parseInt(this.valor), type: tipo.INT };
      case tipo.DOUBLE:
        return { value: parseFloat(this.valor), type: tipo.DOUBLE };
      case tipo.BOOLEAN:
        if (this.valor.toString().toLowerCase() === "true") {
          return { value: true, type: tipo.BOOLEAN };
        } else {
          return { value: false, type: tipo.BOOLEAN };
        }
      case tipo.CHAR:
        return { value: this.valor, type: tipo.CHAR };
      case tipo.STRING:
        return { value: this.valor, type: tipo.STRING };
      default:
        return { value: null, type: tipo.NULL };
    }
  }

  public drawAst(): { rama: string; nodo: string } {
    const id = generateID(15);

    const nodoPrincipal = `nodoPrimitivo${id.toString()}`;

    let ramaPrimitivo = `${nodoPrincipal}[label="Primitivo"];\nnodoPrimitivo${nodoPrincipal}[label="${this.valor.toString()}"];\n${nodoPrincipal} -> nodoPrimitivo${nodoPrincipal};\n`;

    return { rama: ramaPrimitivo, nodo: nodoPrincipal };
  }
}
