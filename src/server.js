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

app.post('/',  async (req, res) => {
	context = {}

	const {name, email} = req.body

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

    res.render('index', context)
})

app.listen(PORT, HOST, () => {
	console.log(`Server started on http://${HOST}:${PORT}`)
})