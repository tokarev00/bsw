import express, { Request, Response } from 'express'
const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Wordldk!')
})

app.listen(port, () => {
  console.log(`Example app lisstening on port ${port}`)
})