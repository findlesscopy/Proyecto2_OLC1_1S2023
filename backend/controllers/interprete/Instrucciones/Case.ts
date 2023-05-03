import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import { Instruccion } from "../Abstractas/Instruccion";
import { Statement } from "./Statement";
import generateID from "../Utils/generadorID";

export class Case extends Instruccion {
  public return_Encontrado: boolean = false;
  public valor_Return: Return = { value: null, type: Type.VOID };

  constructor(
    public valor: Expresion,
    private lista_instrucciones: Statement | null,
    public existe_break: boolean,
    line: number,
    column: number
  ) {
    super(line, column);
  }

  public execute(env: Entorno) {
    this.lista_instrucciones?.execute(env);
  }

  public drawAst(): { rama: string; nodo: string } {
    const id = generateID(15);

    const nodoPrincipal = `nodoCase${id.toString()}`;
    const nodoIDPrincipal = `nodoID${id.toString()}`;

    const codigoAST: { rama: string; nodo: string } = this.valor.drawAst();
    let ramaCase = `${nodoPrincipal}[label="Case"];\n`;

    ramaCase += codigoAST.rama + "\n";

    ramaCase += `${nodoPrincipal} -> ${codigoAST.nodo};\n`;

    if (this.lista_instrucciones != null) {
      const codigoAST2: { rama: string; nodo: string } =
        this.lista_instrucciones.drawAst();

      ramaCase += codigoAST2.rama + "\n";

      ramaCase += `${nodoPrincipal} -> ${codigoAST2.nodo};\n`;
    }

    return { rama: ramaCase, nodo: nodoPrincipal };
  }
}
