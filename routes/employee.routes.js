const { Router } = require('express')
const Employee = require('../models/Employee')
const auth = require('../midlware/auth.midlware')


const router = Router()

router.post('/create', auth, async (req, res) => {
    try {
        const { fullname, gender, contacts, dateOfCreate, salary, position } = req.body
        const existing = await Employee.findOne({ fullname })
        if (existing) {
            res.json({ employee: existing })
        }

        const employee = new Employee({
            fullname, gender, contacts, dateOfCreate, salary, position
        })
        await employee.save()
        res.status(201).json({ employee })
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    }
})
router.post('/update/:id', auth, async (req, res) => {
    try {
        const { fullname, gender, contacts, dateOfCreate, salary, position } = req.body
        await Employee.findByIdAndUpdate({ _id: req.params.id },
            { fullname, gender, contacts, dateOfCreate, salary, position },
            (err, employee) => {
                if (err) { next(err) }
                else {
                    res.redirect('/')
                }
            })

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    }
})
router.delete('/delete/:id', auth, async (req, res) => {
    console.log(req.params)
    try {
        await Employee.findByIdAndDelete(req.params.id,
            (err) => {
                if (err) {
                    console.log("Something went wrong to delete data")
                    next(err)
                }
                else {
                    console.log('Delete succesfully')
                }
            })

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    }

})

router.get('/', auth, paginatedData(Employee), async (req, res) => {
    try {

        res.json(res.paginatedResults)

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    }
})

function paginatedData(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit

        const endIndex = page * limit

        const results = {}

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        results.length = await model.countDocuments().exec()
        try {
            results.results = await model.find().limit(limit).skip(startIndex).exec()

            res.paginatedResults = results
            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}



module.exports = router