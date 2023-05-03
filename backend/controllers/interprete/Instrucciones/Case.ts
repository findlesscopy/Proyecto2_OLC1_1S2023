import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Return, Type } from "../Abstractas/Return";
import { Instruccion } from "../Abstractas/Instruccion";
import { Statement } from "./Statement";

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
    return { rama: "node", nodo: "" };
  }
}
