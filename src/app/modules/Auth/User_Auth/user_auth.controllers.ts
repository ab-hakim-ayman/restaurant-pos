import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import UserAuthServices from './user_auth.services';

const loginUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
	const result = await UserAuthServices.loginUser(req.body);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User logged in successfully!',
		data: result
	});
});

const UserAuthControllers = {
	loginUser
};

export default UserAuthControllers;
