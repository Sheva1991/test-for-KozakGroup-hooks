const { Router } = require('express')
//bcrypt для шифрования пароля
const bcrypt = require('bcryptjs')
// express-validator для валидации со стороны сервера
const { check, validationResult } = require('express-validator')
// jsonwebtoken для авторизации
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Неккоректній email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 }),
        check('login', 'Минимальная длина логина 4 символов').isLength({ min: 4 }),
    ],
    async (req, res) => {
        try {

            //проверяем входящие данные с фронта на ошибки валидации
            const errors = validationResult(req)
            if (!errors.isEmpty()) {

                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные при регистрации'
                })
            }

            const { email, password, login } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: "Такой пользователь уже существует" })
            }

            //используем библиотеку bcrypt для шифрования пароля
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword, login })
            await user.save()

            res.status(201).json({ message: 'Пользователь создан' })

        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
        }
    })

// /api/auth/login
router.post('/login',
    [
        check('password', 'Введите пароль').exists(),
        check('login', 'Введите логин').exists()
    ],
    async (req, res) => {
        try {
            //проверяем входящие данные с фронта на ошибки валидации
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные при входе в систему'
                })
            }

            const { login, password } = req.body

            const user = await User.findOne({ login })

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
            }

            //создание токена
            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '12h' }
            )
            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
        }
    })

module.exports = router