import { loginUser, registerUser, refreshUser, logoutUser } from '../services/auth.js';

const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUtil,
    });

    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUtil,
    });
};

export const registerController = async (req, res) => {
    const { name, email, createdAt, updatedAt } = await registerUser(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully register a user',
        data: { name, email, createdAt, updatedAt },
    });
};

export const loginController = async (req, res) => {
    const session = await loginUser(req.body);

    setupSession(res, session);

    res.status(200).json({
        status: 200,
        message: 'Successfully logged in an user',
        data: { accessToken: session.accessToken },
    });
};

export const refreshController = async (req, res) => {
    const session = await refreshUser(req.cookies);

    setupSession(res, session);

    res.status(200).json({
        status: 200,
        message: 'Session successfully refresh',
        data: { accessToken: session.accessToken },
    });
};

export const logoutController = async (req, res) => { 
    if(req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId);
    };

    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");

    res.status(204).send();
};
