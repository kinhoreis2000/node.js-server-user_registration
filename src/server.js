require("express-async-errors")
const express = require('express')
const AppError = require('./utils/AppError.js')
const app = express()
const routes = require('./routes')

const migrationsRun = require('./database/sqlite/migrations')

app.use(express.json())
migrationsRun()

app.use(routes)

app.use((err,req,res,next) => {

  if(err instanceof AppError) {
    return res.status(err.statusCode).json({
      status : 'error',
      message : err.message}
    )
  } 
  return res.status(500).json({
    status: 'error',
    message: 'InternalSeverError'
    })
  
})
const PORT =3220

app.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`)
)
