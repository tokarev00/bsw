import request from 'supertest';
import { app } from '../../src';

describe("/products", ()=> {
    beforeAll(async ()=> {
        await request(app)
        .delete('/__test__/data');
    });
    it('Should return 200 and empty array', async () => {
        await request(app)
        .get('/products')
        .expect(200, [])
    });
    it('Should return 404 for not existing product', async () => {
        await request(app)
        .get('/products/1')
        .expect(404)
    })
    it('Should create product with correct input data', async () => {
        await request(app)
        .post('/products')
        .send({title: 'test title'})
        .expect(201)

        await request(app)
        .get('/products')
        .expect(200)
        .expect(res => expect(res.body.length).toBe(1));
    })
})