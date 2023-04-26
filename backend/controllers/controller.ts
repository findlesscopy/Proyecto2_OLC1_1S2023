import { Request, Response } from 'express';
import { printList } from "./interprete/Reportes/Printlist";
import { Entorno } from "./interprete/Abstractas/Entorno";
class Controller{
    
    public pong(req: Request, res: Response){
        res.send('Pong from controller class :D');
    }

    public interpretar(req: Request, res: Response){
        var parser = require("./interprete/gramatica");

        const code = req.body.code;
        console.log("Codigo de entrada: "+code)

        try{
            const ast = parser.parse(code);
            
            try{
                printList.splice(0, printList.length);

                const entornoGlobal = new Entorno(null,"Global");

                for(const inst of ast){
                    inst.execute(entornoGlobal);
                }

                res.json({consola:printList.join("\n"), errores: "ninguno"})

            }catch(error){
                console.log("errores: ",error);
                res.json({
                    consola: "Error en la ejecucion",
                    errores: error
                })

            }
        }catch(err){
            console.log("errores: ",err);
            res.json({
                consola: "Error en la ejecucion",
                errores: err
            })
        }
    }
}

export const controller = new Controller();