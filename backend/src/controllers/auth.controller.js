const User = require('../models/user.model');
const jwtToken = require('../middlewares/jwtToken'); 

const authController = {

    // [POST] /login
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user)
                return res.status(400).json({ error: 'Tên đăng nhập không tồn tại' });
            if (password !== user.password) 
                return res.status(400).json({ error: 'Sai mật khẩu' });
            
            const token = jwtToken.generate(user.username, user._id, user.role);
            const id = user._id;

            return res.status(200).json({ token, id, message: 'Đăng nhập thành công' });
        } catch (error) {
            return res.status(400).json({ error });
        }
        
    },

}

module.exports = authController;