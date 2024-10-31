

import {Request, Response} from 'express';
import {LEGALENTITIES} from "./db-data";



export function getAllLegalEntities(req: Request, res: Response) {


    // console.log("ERROR loading courses!");
    // res.status(500).json({message: 'random error occurred.'});
    // return;


        setTimeout(() => {

             res.status(200).json({payload:Object.values(LEGALENTITIES)});

        }, 2000);
}


export function getCourseById(req: Request, res: Response) {

    const courseId = req.params["id"];

    const courses:any = Object.values(LEGALENTITIES);

    const course = courses.find(course => course.id == courseId);

    res.status(200).json(course);
}
