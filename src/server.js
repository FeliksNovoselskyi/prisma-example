import express from 'express'

const app = express()

const PORT = 3000
const HOST = 'localhost'

// Configure templates and statics
app.set('view engine', 'ejs')
app.set('views', './templates')

app.get('/', (req, res) => {
	res.render('index')
})

app.listen(PORT, HOST, () => {
	console.log(`Server started on http://${HOST}:${PORT}`)
})