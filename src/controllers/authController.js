import { Router } from "express";
import { login, register } from "../services/auth-service.js";
import { generateToken } from "../utils/authUtils.js";
import { AUTH_COOKIE_NAME, SECRET } from "../utils/magic-strings.js";
import { isNotUser } from "../middlewares/auth-middleware.js";
const authController = Router();


//*register
authController.get('/register', isNotUser, (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const data = req.body;
    if(data.password != data.confirmPassword){
        throw new Error('Password missmatched!');
    }

    try{
        const newUser = await register(data.name, data.email, data.password);
        const payload = {
            name: newUser.name,
            email: newUser.email,
            id: newUser.id.toString()
        };
        
        const jwtToken = await generateToken(payload);

        res.cookie(AUTH_COOKIE_NAME, jwtToken);
        return res.redirect('/');
    } catch(err){
        console.log(err.message);
        return res.render('auth/register', {error: err.message, data })
    }
});



//*login
authController.get('/login', isNotUser, (req, res) => {
    res.render('auth/login');
});

authController.post('/login', async (req, res) => {
    const data = req.body;

    try{
        const user = await login(data.email, data.password);

        const name = user.name;
        const email = user.email;
        const id = user.id.toString();
        const payload = {
            name,
            email,
            id
        };

        const jwtToken = await generateToken(payload);

        res.cookie(AUTH_COOKIE_NAME, jwtToken);

        return res.redirect('/');
    } catch(err){
        console.log(err.message);
        return res.render('auth/login', {error: err.message, data});
    }
    
});


//*logout

authController.get('/logout', (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/');
});


export default authController;