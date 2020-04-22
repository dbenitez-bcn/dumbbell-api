import bycrypt from 'bcryptjs';
import { Request, Response } from "express";
import { getRepository } from 'typeorm';
import { User } from '../../models/entities/user';
import LoginRequest from '../../models/requests/loginRequest';
import { parseLoginBody } from './validations';
import { Constants } from '../../config/constants';

export const loginHandler = async (req: Request, res: Response) => {
    let request: LoginRequest;
    let user: User;

    try {
        request = await parseLoginBody(req.body);
    } catch (error) {
        res.status(422).send(error.message);
        return;
    }

    try {
        user = await getRepository(User)
            .findOneOrFail({
                email: request.email
            })
    } catch (error) {
        res.status(404).send(Constants.LOGIN_FAILURE);
        return;
    }

    const isRightPassword = await bycrypt.compare(request.password, user.password);
    if (isRightPassword) {
        res.status(200).send();
    }
    else {
        res.status(401).send(Constants.LOGIN_FAILURE);
    }
}