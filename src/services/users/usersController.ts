import bycrypt from 'bcryptjs';
import { Request, Response } from "express";
import { parseUserRegistrationBody } from "./validations";
import { getRepository } from 'typeorm';
import { User } from '../../models/entities/user';

export const userRegistrationHandler = async (req: Request, res: Response) => {
    let request;
    try {
        request = await parseUserRegistrationBody(req.body);
    } catch (error) {
        res.status(422).send(error.message);
        return;
    }

    const hashedPassword = await bycrypt.hash(request.password, 10);
    const repo = getRepository(User);
    const user = new User();
    user.username = request.username;
    user.email = request.email;
    user.password = hashedPassword;
    await repo.save(user);
    res.status(201).send();
}