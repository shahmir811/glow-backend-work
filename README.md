# Glow Backend Assignment

## Overview

This project is a simple Node.js API that simulates a business workflow. The workflow stages include:

- **New:** A newly created business.

- **Market Approved:** The business industry is within the target market.

- **Market Declined:** The business industry is not within the target market.

- **Sales Approved:** The business is now part of the sales process.

- **Won:** The business deal was successfully closed.

- **Lost:** The business deal was not closed.

The API allows you to create a business and progress it through these stages based on certain rules and conditions.

## Project Structure

- **`src/`**: Contains the source code for the API.

- **`index.js`**: The main entry point for the Express server.

- **`businessController.js`**: Handles the business logic and workflow progression.

- **`businessModel.js`**: Defines the Business data model.

- **`tests/`**: Contains unit tests for the API.

- **`businessWorkflow.test.js`**: Tests the business workflow functionality.

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your system.

### Installation

1\. Clone the repository:

```bash

git clone https://github.com/your-username/business-workflow.git

cd business-workflow

```

2\. Install the dependencies:

```bash

npm install

```

### Running the API

1\. Start the server:

```bash

node src/index.js

```

The server will start on `http://localhost:3000`.

2\. Test the API using Postman, Curl, or any HTTP client.

### API Endpoints

#### 1. Create a New Business

- **Endpoint:** `POST /business`

- **Description:** Creates a new business in the workflow.

**Request Body:**

```json
{
	"fein": "123456789",

	"name": "Test Business",

	"industry": "restaurants"
}
```

**Response:**

```json
{
	"message": "Business created.",

	"business": {
		"fein": "123456789",

		"name": "Test Business",

		"industry": "restaurants",

		"contact": null,

		"stage": "New"
	}
}
```

#### 2. Progress Business Workflow

- **Endpoint:** `POST /business/:fein/progress`

- **Description:** Progresses the business through the workflow stages based on the current state and available data.

**Request Parameters:**

- `fein`: The Federal Employer ID Number of the business.

**Example Request Body for Sales Approved Stage:**

```json
{
	"status": "Won"
}
```

**Response:**

```json
{
	"message": "Business progressed.",

	"business": {
		"fein": "123456789",

		"name": "Test Business",

		"industry": "restaurants",

		"contact": {
			"name": "John Doe",

			"phone": "555-1234"
		},

		"stage": "Won"
	}
}
```

### Running Tests

To run the unit tests, execute the following command:

```bash

npm test

```

The tests are written using `jest` and `supertest` to ensure that the business workflow API works as expected.

### Project Assumptions

- All fields are optional except for `name` and `fein`.

- The API does not use any external database, and business data is stored in memory.

- The workflow can only progress one step at a time.

- Contact information is required only when progressing from "Market Approved" to "Sales Approved".

- The supported industries for market approval are "restaurants" and "stores". Other industries are automatically declined.

### Conclusion

This API is a simple implementation of a business workflow system. It demonstrates basic RESTful API design and workflow progression based on rules. Feel free to modify and expand upon it to suit your needs.
