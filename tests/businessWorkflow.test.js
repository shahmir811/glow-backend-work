const request = require('supertest');
const express = require('express');
const { createBusiness, progressWorkflow } = require('../src/businessController');

const app = express();
app.use(express.json());
app.post('/business', createBusiness);
app.post('/business/:fein/progress', progressWorkflow);

describe('Business Workflow API', () => {
	it('should create a new business', async () => {
		const response = await request(app)
			.post('/business')
			.send({ fein: '123456789', name: 'Test Business', industry: 'restaurants' });

		expect(response.statusCode).toBe(201);
		expect(response.body.business.name).toBe('Test Business');
		expect(response.body.business.stage).toBe('New');
	});

	it('should progress to Market Approved', async () => {
		await request(app).post('/business').send({ fein: '123456789', name: 'Test Business', industry: 'restaurants' });

		const response = await request(app).post('/business/123456789/progress').send();

		expect(response.statusCode).toBe(200);
		expect(response.body.business.stage).toBe('Market Approved');
	});
});
