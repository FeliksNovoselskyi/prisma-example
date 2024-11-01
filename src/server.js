import express from 'express'
import {PrismaClient} from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

const PORT = 3000
const HOST = 'localhost'

// Configure templates and statics
app.set('view engine', 'ejs')
app.set('views', './templates')

app.use(express.urlencoded({extended: true}))

let context

app.get('/', (req, res) => {
	context = {}

	context.error = null

	res.render('index', context)
})

app.get('/user/', async (req, res) => {
	context = {}

	context.error = null

	res.render('user', context)
})

app.post('/',  async (req, res) => {
	context = {}

	const {name, email, action} = req.body

	if (action === 'addUser') {
		if (!name || !email) {
			context.error = "Fill all inputs!"
		} else {
			const user = await prisma.user.create({
				data: {
					name: name,
					email: email
				}
			})
			context.error = null
		}
	}

    res.render('index', context)
})

app.post('/user/',  async (req, res) => {
	context = {}

	const {name, action} = req.body

	if (action === 'deleteUser') {
		if (!name) {
			context.error = "Fill all inputs!"
		} else {
			const user = await prisma.user.deleteMany({
				where: {
					name: name
				}
			})
			context.error = null
		}
	}

    res.render('user', context)
})

app.listen(PORT, HOST, () => {
	console.log(`Server started on http://${HOST}:${PORT}`)
})