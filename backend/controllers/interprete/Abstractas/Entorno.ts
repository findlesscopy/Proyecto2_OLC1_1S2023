import { Simbolo } from "./Simbolos";
import { Type } from "./Return";
import { printList } from "../Reportes/Printlist";
import { Funcion } from "../Instrucciones/Funcion";
import { ListaTabla,TablaSimbolos } from "../Reportes/TablaSimbolos";

export class Entorno {
    private variables = new Map<string, Simbolo>();   //  mapa de variables
    private funciones = new Map<string, Funcion>();   //  mapa de variables

    // constructor
    constructor(private anterior: Entorno | null) {
      this.variables = new Map<string, Simbolo>();
      
    }
  
    // guardar una nueva variable
    public guardar(id: string, valor: any , tipo: Type,linea:number,columna:number)  {
      // verificar el ambito
      let env: Entorno | null = this;
  
      // verificar si la variable ya existe
      if (!env.variables.has(id.toLowerCase())) {
        // guardar la variable
        // guardar la variable en una tabla de simbolos para el reporte
        env.variables.set(id.toLowerCase(), new Simbolo(valor, id, tipo));
      }else {
        printList.push("Error, La variable "+id+" ya existe en el entorno, linea "+linea+" y columna "+columna);
      }
  
    }

    public actualizar_variable(nombre: string, valor: any) {
      let env: Entorno | null = this;
  
      while (env != null) {
          if (env.variables.has(nombre)) {
              for (let entry of Array.from(env.variables.entries())) {
                  if (entry[0] == nombre) {
                      entry[1].valor = valor;
                      return
                  }
              }
          }
          env = env.anterior;
      }
  }

    // obtener una variable
    public getVar(id: string): Simbolo | null { 
      // verificar el ambito
      let env: Entorno | null = this;

      // buscar la variable en el entorno actual
      while (env != null) {
        // verificar si la variable existe
       if(env.variables.has(id.toLowerCase())){
        return env.variables.get(id.toLowerCase())!;
       }
        // buscar en el entorno anterior
        env = env.anterior;
      }  
      return null;  
    }

    // guardar una nueva funcion
  public guardarFuncion(id: string, funcion: Funcion) {
    // verificar el ambito
    let env: Entorno | null = this;

    // verificar si la funcion ya existe
    if (!env.funciones.has(id.toLowerCase())) {
      // guardar la variable
      // guardar la variable en una tabla de simbolos para el reporte
      env.funciones.set(id.toLowerCase(),funcion);
    }else {
      printList.push("Error, La funcion "+id+" ya existe en el entorno");
    }
  }


  // acceder a una funcion
  public getFuncion(id: string): Funcion | null {
    // verificar el ambito
    let env: Entorno | null = this;

    // buscar la variable
    while (env != null) {
      // verificar si la variable existe
      if (env.funciones.has(id.toLowerCase())) {
        // retornar la variable
        return env.funciones.get(id.toLowerCase())!;
      }
      // cambiar de ambito
      env = env.anterior;
    }

    // retornar null si no se encontro la variable
    return null;
  }

  // obtener el entorno global
  public getGlobal(): Entorno {
    // verificar el ambito
    let env: Entorno | null = this;

    // buscar la variable
    while (env.anterior != null) {
      // cambiar de ambito
      env = env.anterior;
    }
    // retornar el entorno global
    return env;
  }

  
}
  