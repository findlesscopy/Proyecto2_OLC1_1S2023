import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Abstractas/Entorno";
import { Type } from "../Abstractas/Return";
import generateID from "../Utils/generadorID";
export class LlamadaFuncion extends Expresion {
  constructor(
    private id: string,
    private argumentos: Array<Expresion>,
    line: number,
    column: number
  ) {
    super(line, column);
  }

  public execute(env: Entorno): any {
    const funcion = env.getFuncion(this.id);

    if (funcion != null) {
      const envFun = new Entorno(env.getGlobal());

      if (funcion.parametros.length == this.argumentos.length) {
        for (let i = 0; i < funcion.parametros.length; i++) {
          const valor = this.argumentos[i].execute(env);
          const param = funcion.parametros[i].execute(env);
          
          if (valor.type == param.type) {
            envFun.guardar(
              param.value,
              valor.value,
              valor.type,
              this.line,
              this.column
            );
          } else {
            console.log(
              "Error, El parametro " +
                param.value +
                " no es del tipo " +
                param.type +
                ", linea " +
                this.line +
                " y columna " +
                this.column
            );
          }
        }
        funcion.statement.execute(envFun);
      } else {
        console.log(
          "Error, La funcion " +
            this.id +
            " no tiene la cantidad de parametros correcta, linea " +
            this.line +
            " y columna " +
            this.column
        );
      }
    } else {
      console.log(
        "Error, La funcion " +
          this.id +
          " no existe, linea " +
          this.line +
          " y columna " +
          this.column
      );
    }
  }
  public drawAst(): { rama: string; nodo: string } {
    const id = generateID(15);

    const nodoPrincipal = `nodoLlamadaFuncion${id.toString()}`;
    const nodoIDPrincipal = `nodoID${id.toString()}`;

    let ramaLlamadaFuncion = `${nodoPrincipal}[label="LlamadaFuncion"];\n`;

    ramaLlamadaFuncion += `${nodoIDPrincipal}[label="${this.id}"];\n`;

    ramaLlamadaFuncion += `${nodoPrincipal} -> ${nodoIDPrincipal};\n`;

    if (this.argumentos != null) {
      for (let i = 0; i < this.argumentos.length; i++) {
        const codigoAST2: { rama: string; nodo: string } = this.argumentos[
          i
        ].drawAst();
        ramaLlamadaFuncion += codigoAST2.rama + "\n";
        ramaLlamadaFuncion += `${nodoPrincipal} -> ${codigoAST2.nodo};\n`;
      }
    }

    return { rama: ramaLlamadaFuncion, nodo: nodoPrincipal };
  }
}
