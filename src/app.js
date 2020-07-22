const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')


const port = process.env.PORT || 3000 // heroku port
const app = express()

// Setup handlebars paths
app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather app bro',
        name: 'Me me me',
    })
})

app.get('/weather', (req, res) => {
    let send = {}
    if (!req.query.address) {
        res.send({
            error: 'Please provide a search term'
        })
    } else {
        geocode.geocode(req.query.address, (error, {lattitude, longtitude} = {}) => {
            if (error) {
                send = error
            } else {
                send = {
                    title: 'Weather at ' + req.query.address,
                    weather: {
                        lattitude,
                        longtitude
                    }
                }
            }

            // console.log(req.query)
            res.send(send)
        })
    }
})

app.get('/products', (req, res) => {
    let send = ''
    if (!req.query.search) {
        send = {
            error: 'Please provide a search term'
        }
    } else {
        send = {
            title: 'Weather app bro',
            name: 'Me me me',
        }
    }
    
    // console.log(req.query)
    res.send(send)
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Abouteroni',
        name: 'Me me me',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Helperoni',
        helpText: 'Helptext',
        name: 'Me me me',
    })
})

app.get('*', (req, res) => {
    res.render('help', {
        title: '404',
        helpText: 'Page not found',
        name: 'Me me me',
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})