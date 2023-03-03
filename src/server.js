require("express-async-errors")
const express = require('express')
const AppError = require('./utils/AppError.js')
const cors = require('cors')
const app = express()
const routes = require('./routes')
const uploadConfig = require('./configs/upload')
const migrationsRun = require('./database/sqlite/migrations')


app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.json())

migrationsRun()


app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))
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
