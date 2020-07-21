console.log('Client side js file loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const p1 = document.getElementById('1')
const p2 = document.getElementById('2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // page will not refresh

    const location = search.value
    p1.textContent = 'Loading...'
    p2.textContent = ''

    try {
        fetch('http://localhost:3000/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    p1.textContent = data.error
                }

                p1.textContent = data.title
                p2.textContent = data.weather.lattitude + ' ' + data.weather.longtitude
            }).catch((e) => {
                p1.textContent = 'The server returned an error, please try a different location'
            })
        })
    } catch(err) {
        console.log(err)
    }

    console.log(location)

})
