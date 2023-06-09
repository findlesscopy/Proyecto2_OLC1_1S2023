import { Expresion } from "../Abstractas/Expresion";
import { Return, Type } from "../Abstractas/Return";
import { Entorno } from "../Abstractas/Entorno";
import { TipoOperacion } from "../Utils/TipoOperacion";
import {
  TablaSuma,
  TablaResta,
  TablaDivision,
  TablaModulo,
  TablaMultiplicacion,
  TablaPotencia,
} from "../Utils/MatrizDominante";
import { printList } from "../Reportes/Printlist";
import generateID  from "../Utils/generadorID";

export class Aritmetica extends Expresion {
  constructor(
    private izquierdo: Expresion,
    private derecha: Expresion,
    private operador: TipoOperacion,
    linea: number,
    columna: number
  ) {
    super(linea, columna);
  }

  public execute(env: Entorno): Return {
    // verificar el tipo de operacion
    if (this.operador == TipoOperacion.SUMA) {
      // obtener los valores de  los operandos
      const op1 = this.izquierdo.execute(env);
      const op2 = this.derecha.execute(env);
      // obtener el tipo de dato de los operandos
      const tipoDominante = TablaSuma[op1.type][op2.type];
      // verificar el tipo de dato
      switch (tipoDominante) {
        case Type.INT:
          // verificar si algun operando es de tipo boleano
          if (op1.type == Type.BOOLEAN) {
            // convertir el valor a entero
            op1.value = op1.value ? 1 : 0;
          }
          if (op2.type == Type.BOOLEAN) {
            // convertir el valor a entero
            op2.value = op2.value ? 1 : 0;
          }
          // verificar si algun operando es de tipo caracter
          if (op1.type == Type.CHAR) {
            // convertir el valor a entero
            op1.value = op1.value.charCodeAt(0);
          }
          if (op2.type == Type.CHAR) {
            // convertir el valor a entero
            op2.value = op2.value.charCodeAt(0);
          }
          return { value: op1.value + op2.value, type: Type.INT };
        case Type.DOUBLE:
          // verificar si algun operando es de tipo boleano
          if (op1.type == Type.BOOLEAN) {
            // convertir el valor a entero
            op1.value = op1.value ? 1 : 0;
          }
          if (op2.type == Type.BOOLEAN) {
            // convertir el valor a entero
            op2.value = op2.value ? 1 : 0;
          }
          // verificar si algun operando es de tipo caracter
          if (op1.type == Type.CHAR) {
            // convertir el valor a entero
            op1.value = op1.value.charCodeAt(0);
          }
          if (op2.type == Type.CHAR) {
            // convertir el valor a entero
            op2.value = op2.value.charCodeAt(0);
          }
          return { value: op1.value + op2.value, type: Type.DOUBLE };
        case Type.STRING:
          return { value: op1.value + op2.value, type: Type.STRING };
      }
    } else if (this.operador == TipoOperacion.RESTA) {
      // obtener los valores de  los operandos
      const op1 = this.izquierdo.execute(env);
      const op2 = this.derecha.execute(env);
      // obtener el tipo de dato de los operandos
      const tipoDominante = TablaResta[op1.type][op2.type];
      // verificar el tipo de dato
      switch (tipoDominante) {
        case Type.INT:
          // verificar si algun operando es de tipo boleano
          if (op1.type == Type.BOOLEAN) {
            // convertir el valor a entero
            op1.value = op1.value ? 1 : 0;
          }
          if (op2.type == Type.BOOLEAN) {
            // convertir el valor a entero
            op2.value = op2.value ? 1 : 0;
          }
          // verificar si algun operando es de tipo caracter
          if (op1.type == Type.CHAR) {
            // convertir el valor a entero
            op1.value = op1.value.charCodeAt(0);
          }
          if (op2.type == Type.CHAR) {
            // convertir el valor a entero
            op2.value = op2.value.charCodeAt(0);
          }
          return { value: op1.value - op2.value, type: Type.INT };
        case Type.DOUBLE:
          // verificar si algun operando es de tipo boleano
          if (op1.type == Type.BOOLEAN) {
            // convertir el valor a entero
            op1.value = op1.value ? 1 : 0;
          }
          if (op2.type == Type.BOOLEAN) {
            // convertir el valor a entero
            op2.value = op2.value ? 1 : 0;
          }
          // verificar si algun operando es de tipo caracter
          if (op1.type == Type.CHAR) {
            // convertir el valor a entero
            op1.value = op1.value.charCodeAt(0);
          }
          if (op2.type == Type.CHAR) {
            // convertir el valor a entero
            op2.value = op2.value.charCodeAt(0);
          }
          return { value: op1.value - op2.value, type: Type.DOUBLE };
      }
    } else if (this.operador == TipoOperacion.MULTIPLICACION) {
      const op1 = this.izquierdo.execute(env);
      const op2 = this.derecha.execute(env);

      const tipoDominante = TablaMultiplicacion[op1.type][op2.type];

      switch (tipoDominante) {
        case Type.INT:
          if (op1.type == Type.CHAR) {
            op1.value = op1.value.charCodeAt(0);
          }
          if (op2.type == Type.CHAR) {
            op2.value = op2.value.charCodeAt(0);
          }
          return { value: op1.value * op2.value, type: Type.INT };
        case Type.DOUBLE:
          if (op1.type == Type.CHAR) {
            op1.value = op1.value.charCodeAt(0);
          }
          if (op2.type == Type.CHAR) {
            op2.value = op2.value.charCodeAt(0);
          }
          return { value: op1.value * op2.value, type: Type.DOUBLE };
      }
    } else if (this.operador == TipoOperacion.DIVISION) {
      const op1 = this.izquierdo.execute(env);
      const op2 = this.derecha.execute(env);

      const tipoDominante = TablaDivision[op1.type][op2.type];

      switch (tipoDominante) {
        case Type.DOUBLE:
          if (op1.type == Type.CHAR) {
            op1.value = op1.value.charCodeAt(0);
          }
          if (op2.type == Type.CHAR) {
            op2.value = op2.value.charCodeAt(0);
          }
          return { value: op1.value / op2.value, type: Type.DOUBLE };
      }
    } else if (this.operador == TipoOperacion.POTENCIA) {
      const op1 = this.izquierdo.execute(env);
      const op2 = this.derecha.execute(env);

      const tipoDominante = TablaDivision[op1.type][op2.type];

      switch (tipoDominante) {
        case Type.INT:
          return { value: Math.pow(op1.value, op2.value), type: Type.INT };
        case Type.DOUBLE:
          return { value: Math.pow(op1.value, op2.value), type: Type.DOUBLE };
      }
    } else if (this.operador == TipoOperacion.MODULO) {
      const op1 = this.izquierdo.execute(env);
      const op2 = this.derecha.execute(env);

      const tipoDominante = TablaModulo[op1.type][op2.type];

      switch (tipoDominante) {
        case Type.DOUBLE:
          return { value: op1.value % op2.value, type: Type.DOUBLE };
      }
    } else if (this.operador == TipoOperacion.MENOSUNARIO) {
      const op2 = this.izquierdo.execute(env);
      if (op2.type == Type.INT) {
        return { value: -op2.value, type: Type.INT };
      } else if (op2.type == Type.DOUBLE) {
        return { value: -op2.value, type: Type.DOUBLE };
      }
    }
    return { value: null, type: Type.NULL };
  }

  public drawAst(): { rama: string; nodo: string } {
    const id = generateID(15)
    
    const nodoPrincipal = `node${id}`;
    const nodoOperador = `node${generateID(15)}`;
    const nodoIzquierdo = `node${generateID(15)}`;
    const nodoDerecho = `node${generateID(15)}`;

    const ramaIzquierda = this.izquierdo.drawAst();
    const ramaDerecha = this.derecha.drawAst();

    const rama = `node${id} [label="Operacion", fillcolor="LightBlue", style ="filled", shape="box"]; \n`;
    const rama2 = `${nodoOperador} [label="${this.operador}", fillcolor="LightBlue", style ="filled", shape="box"]; \n`;

    const rama3 = `${ramaIzquierda.rama} \n`;
    const rama4 = `${ramaDerecha.rama} \n`;

    const rama5 = `${nodoPrincipal} -> ${nodoOperador} \n`;

    const rama6 = `${nodoOperador} -> ${ramaIzquierda.nodo} \n`;
    const rama7 = `${nodoOperador} -> ${ramaDerecha.nodo} \n`;

    return {
      rama: rama + rama2 + rama3 + rama4 + rama5 + rama6 + rama7,
      nodo: nodoPrincipal,
    };
  }
}
