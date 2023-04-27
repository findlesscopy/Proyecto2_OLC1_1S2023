import { Expresion } from "../Abstractas/Expresion";
import { Return, Type } from "../Abstractas/Return";
import { Entorno } from "../Abstractas/Entorno";
import { TipoRelacional } from "../Utils/TipoRelacional";

export class Relacionales extends Expresion {
  constructor(
    private izq: Expresion,
    private der: Expresion,
    private operador: TipoRelacional,
    linea: number,
    columna: number
  ) {
    super(linea, columna);
  }

  public execute(env: Entorno): Return {
    if (this.operador == TipoRelacional.MAYOR) {
      const op1 = this.izq.execute(env);
      const op2 = this.der.execute(env);

      if (op1.type == Type.CHAR) {
        op1.value = op1.value.charCodeAt(0);
      }
      if (op2.type == Type.CHAR) {
        op2.value = op2.value.charCodeAt(0);
      }
      if (op1.type == Type.INT && op2.type == Type.DOUBLE) {
        return { value: op1.value > op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.DOUBLE && op2.type == Type.INT) {
        return { value: op1.value > op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.INT && op2.type == Type.INT) {
        return { value: op1.value > op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.DOUBLE && op2.type == Type.DOUBLE) {
        return { value: op1.value > op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.CHAR && op2.type == Type.CHAR) {
        return { value: op1.value > op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.CHAR && op2.type == Type.INT) {
        return { value: op1.value > op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.INT && op2.type == Type.CHAR) {
        return { value: op1.value > op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.CHAR && op2.type == Type.DOUBLE) {
        return { value: op1.value > op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.DOUBLE && op2.type == Type.CHAR) {
        return { value: op1.value > op2.value, type: Type.BOOLEAN };
      } else {
        console.log("No se puede operar con los tipos de datos");
      }
    } else if (this.operador == TipoRelacional.MENOR) {
      const op1 = this.izq.execute(env);
      const op2 = this.der.execute(env);

      if (op1.type == Type.CHAR) {
        op1.value = op1.value.charCodeAt(0);
      }
      if (op2.type == Type.CHAR) {
        op2.value = op2.value.charCodeAt(0);
      }
      if (op1.type == Type.INT && op2.type == Type.DOUBLE) {
        return { value: op1.value < op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.DOUBLE && op2.type == Type.INT) {
        return { value: op1.value < op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.INT && op2.type == Type.INT) {
        return { value: op1.value < op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.DOUBLE && op2.type == Type.DOUBLE) {
        return { value: op1.value < op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.CHAR && op2.type == Type.CHAR) {
        return { value: op1.value < op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.CHAR && op2.type == Type.INT) {
        return { value: op1.value < op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.INT && op2.type == Type.CHAR) {
        return { value: op1.value < op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.CHAR && op2.type == Type.DOUBLE) {
        return { value: op1.value < op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.DOUBLE && op2.type == Type.CHAR) {
        return { value: op1.value < op2.value, type: Type.BOOLEAN };
      } else {
        console.log("No se puede operar con los tipos de datos");
      }
    } else if (this.operador == TipoRelacional.MAYORIGUAL) {
      const op1 = this.izq.execute(env);
      const op2 = this.der.execute(env);

      if (op1.type == Type.CHAR) {
        op1.value = op1.value.charCodeAt(0);
      }
      if (op2.type == Type.CHAR) {
        op2.value = op2.value.charCodeAt(0);
      }
      if (op1.type == Type.INT && op2.type == Type.DOUBLE) {
        return { value: op1.value >= op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.DOUBLE && op2.type == Type.INT) {
        return { value: op1.value >= op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.INT && op2.type == Type.INT) {
        return { value: op1.value >= op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.DOUBLE && op2.type == Type.DOUBLE) {
        return { value: op1.value >= op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.CHAR && op2.type == Type.CHAR) {
        return { value: op1.value >= op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.CHAR && op2.type == Type.INT) {
        return { value: op1.value >= op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.INT && op2.type == Type.CHAR) {
        return { value: op1.value >= op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.CHAR && op2.type == Type.DOUBLE) {
        return { value: op1.value >= op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.DOUBLE && op2.type == Type.CHAR) {
        return { value: op1.value >= op2.value, type: Type.BOOLEAN };
      } else {
        console.log("No se puede operar con los tipos de datos");
      }
    } else if (this.operador == TipoRelacional.MENORIGUAL) {
      const op1 = this.izq.execute(env);
      const op2 = this.der.execute(env);

      if (op1.type == Type.CHAR) {
        op1.value = op1.value.charCodeAt(0);
      }
      if (op2.type == Type.CHAR) {
        op2.value = op2.value.charCodeAt(0);
      }
      if (op1.type == Type.INT && op2.type == Type.DOUBLE) {
        return { value: op1.value <= op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.DOUBLE && op2.type == Type.INT) {
        return { value: op1.value <= op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.INT && op2.type == Type.INT) {
        return { value: op1.value <= op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.DOUBLE && op2.type == Type.DOUBLE) {
        return { value: op1.value <= op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.CHAR && op2.type == Type.CHAR) {
        return { value: op1.value <= op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.CHAR && op2.type == Type.INT) {
        return { value: op1.value <= op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.INT && op2.type == Type.CHAR) {
        return { value: op1.value <= op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.CHAR && op2.type == Type.DOUBLE) {
        return { value: op1.value <= op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.DOUBLE && op2.type == Type.CHAR) {
        return { value: op1.value <= op2.value, type: Type.BOOLEAN };
      } else {
        console.log("No se puede operar con los tipos de datos");
      }
    } else if (this.operador == TipoRelacional.IGUALACION) {
      const op1 = this.izq.execute(env);
      const op2 = this.der.execute(env);

      if (op1.type == Type.INT && op2.type == Type.DOUBLE) {
        return { value: op1.value == op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.DOUBLE && op2.type == Type.INT) {
        return { value: op1.value == op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.INT && op2.type == Type.INT) {
        return { value: op1.value == op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.DOUBLE && op2.type == Type.DOUBLE) {
        return { value: op1.value == op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.CHAR && op2.type == Type.CHAR) {
        return { value: op1.value == op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.CHAR && op2.type == Type.INT) {
        return { value: op1.value == op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.INT && op2.type == Type.CHAR) {
        return { value: op1.value == op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.CHAR && op2.type == Type.DOUBLE) {
        return { value: op1.value == op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.DOUBLE && op2.type == Type.CHAR) {
        return { value: op1.value == op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.BOOLEAN && op2.type == Type.BOOLEAN) {
        return { value: op1.value == op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.NULL && op2.type == Type.NULL) {
        return { value: op1.value == op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.STRING && op2.type == Type.STRING) {
        return { value: op1.value == op2.value, type: Type.BOOLEAN };
      } else {
        console.log("No se puede operar con los tipos de datos");
      }
    } else if (this.operador == TipoRelacional.DIFERENTE) {
      const op1 = this.izq.execute(env);
      const op2 = this.der.execute(env);

      if (op1.type == Type.INT && op2.type == Type.DOUBLE) {
        return { value: op1.value != op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.DOUBLE && op2.type == Type.INT) {
        return { value: op1.value != op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.INT && op2.type == Type.INT) {
        return { value: op1.value != op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.DOUBLE && op2.type == Type.DOUBLE) {
        return { value: op1.value != op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.CHAR && op2.type == Type.CHAR) {
        return { value: op1.value != op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.CHAR && op2.type == Type.INT) {
        return { value: op1.value != op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.INT && op2.type == Type.CHAR) {
        return { value: op1.value != op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.CHAR && op2.type == Type.DOUBLE) {
        return { value: op1.value != op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.DOUBLE && op2.type == Type.CHAR) {
        return { value: op1.value != op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.BOOLEAN && op2.type == Type.BOOLEAN) {
        return { value: op1.value != op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.NULL && op2.type == Type.NULL) {
        return { value: op1.value != op2.value, type: Type.BOOLEAN };
      } else if (op1.type == Type.STRING && op2.type == Type.STRING) {
        return { value: op1.value != op2.value, type: Type.BOOLEAN };
      } else {
        console.log("No se puede operar con los tipos de datos");
      }
    }
    return { value: null, type: Type.NULL };
  }

  public drawAst(): { rama: string; nodo: string } {
    return { rama: "node", nodo: "" };
  }
}
