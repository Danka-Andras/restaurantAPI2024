const express = require('express')
const routes = require('./routes/routes')

const server = express()

server.use(express.json()) //A POST-ban req.body-ban json mehet át
server.use('/api', routes)

server.listen(3000, ()=>{
    console.log('A szerver elindult...')
})