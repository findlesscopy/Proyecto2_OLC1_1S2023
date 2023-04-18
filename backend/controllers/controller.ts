import { Request, Response } from 'express';

class Controller{
    
    public pong(req: Request, res: Response){
        res.send('Pong from controller class :D');
    }
}

export const controller = new Controller();