import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';


const app = express();
const port = process.env.PORT || 3000;

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}];
const addresses = [{id: 1, value: 'Nezalejnasti 12'}, {id: 2, value: 'Selickaga 11'}];

app.use(bodyParser());

app.get('/products', (req: Request, res: Response) => {
  if(req.query.title) {
    res.send(products.filter(product => product.title.indexOf(String(req.query.title)) > -1));
  } else {
    res.send(products);
  }
})

app.post('/products', (req: Request, res: Response) => {
  const newProduct = {id: +(new Date()), title: String(req.body.title) || 'no title'};

  products.push(newProduct);

  res.status(201).send(newProduct);
})

app.get('/products/:id', (req: Request, res: Response) => {
  const product = products.find(prod => prod.id === +req.params.id);

  if(product) {
    res.send(product);
  } else {
    res.sendStatus(404);
  }
})

app.put('/products/:id', (req: Request, res: Response) => {
  const product = products.find(prod => prod.id === +req.params.id);

  if(product) {
    product.title = req.body.title;
    res.send(product);
  } else {
    res.sendStatus(404);
  }
})

app.delete('/products/:id', (req: Request, res: Response) => {
  const productIndex = products.findIndex(prod => prod.id === +req.params.id);

  if(productIndex !== -1) {
    products.splice(productIndex, 1);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
})

app.get('/addresses', (req: Request, res: Response) => {
  res.send(addresses);
})

app.get('/addresses/:id', (req: Request, res: Response) => {
  const address = addresses.find(address => address.id === +req.params.id);

  if(address) {
    res.send(address);
  } else {
    res.sendStatus(404);
  }
})

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Word!');
})

app.listen(port, () => {
  console.log(`Example app lisstening on port ${port}`);
})