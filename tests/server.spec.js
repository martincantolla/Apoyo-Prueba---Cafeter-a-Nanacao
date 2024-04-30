const request = require('supertest');
const app = require('../index');

describe("Operaciones CRUD de cafes", () => {

// Testing para GET /cafes
test('GET /cafes debe dar status 200 y dar datos tipo arreglo con por lo menos 1 objeto', async () => {
  const response = await request(app).get('/cafes');
  expect(response.status).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
  expect(response.body.length).toBeGreaterThan(0);
});

// Testing para DELETE /cafes/:id con ID no existente
test('DELETE /cafes/:id con ID inexistente debe dar status 404', async () => {

  const jwt = "token";
  const response = await request(app)
  .delete('/cafes/999') // Asumiendo que 999 no existe
  .set("Authorization", jwt);
  expect(response.status).toBe(404);
});

// Testing para POST /cafes
test('POST /cafes debe agregar un nuevo café y dar status 201', async () => {
  const newCafe = { id: 5, nombre: 'Latte' }; 
  const response = await request(app).post('/cafes').send(newCafe);
  expect(response.status).toBe(201);
});

// Testing para PUT /cafes/:id con IDs diferentes en payload y URL
test('PUT /cafes/:id con IDs diferentes debe dar status 400', async () => {
  const updatedCafe = { id: 4, nombre: 'Updated Cappuccino' }; // ID en payload distinta a ID en URL
  const response = await request(app).put('/cafes/3').send(updatedCafe); // Actualizando con ID (3 en vez de 4)
  expect(response.status).toBe(400);
});


});
