import { Request, Response } from 'express';

class Controller{
    
    public pong(req: Request, res: Response){
        res.send('Pong from controller class :D');
    }

    public interpretar(req: Request, res: Response){
        var parser = require("../interprete/gramatica");

        const code = req.body.code;
        console.log(code)

        try{
            const ast = parser.parse(code);
           
            for(const inst of ast){
                inst.execute();
            }
        }catch(error){
            console.log(error);
            res.json({
                consola:error,
                errores: error
            })
        }
    }
}

export const controller = new Controller();