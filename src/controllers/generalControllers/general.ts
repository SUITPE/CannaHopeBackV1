import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';


export default class GeneralServices {

    public static getDocuments(req: Request, res: Response) {

        const type: string = req.params.type;
        const documentPath: string = req.params.documentPath;

        if (type === 'userImage') {
            const pathImage = path.resolve(__dirname, `../../../docs/userImages/${documentPath}`);


            if (fs.existsSync(pathImage)) {
                res.sendFile(pathImage);
            } else {
                const pathNoImage = path.resolve(__dirname, '../../../docs/no-image.png');
                res.sendFile(pathNoImage);
            }
        } else {
            const pathNoImage = path.resolve(__dirname, '../../../docs/no-image.png');
            res.sendFile(pathNoImage);
        }
    }

    // public async getDashboardData(req: Request, res: Response): Promise<Response> {
    //     try {

    //     } catch (error) {

    //     }
    // }


}