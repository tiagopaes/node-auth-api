# Node Auth API

This is a simple Node.js API built with TypeScript, Express, and MongoDB. It includes authentication-related endpoints, user registration, user profile, and password update functionality.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
  - [User Registration](#user-registration)
  - [User Authentication](#user-authentication)
  - [User Profile](#user-profile)
  - [Update Password](#update-password)
- [Testing](#testing)
- [Contributing](#contributing)

## Installation

1. Clone the repository:

  ```bash
    git clone https://github.com/tiagopaes/node-auth-api.git && cd node-auth-api
  ```

2. Create a .env file for environment variables:
  ```bash
    cp .env.example .env
  ```

3. Setup the docker environment, install dependencies and start the development server:
  ```bash
    npm run docker-start
  ```

## Usage
The API is now running locally at `http://localhost:3000`.

## Endpoints

### User Registration

- **Method**: `POST`
- **Endpoint**: `/register`
- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "name": "User Name",
    "password": "password123",
    "contact": {
      "whatsapp": "551188978564"
    }
  }
  ```
- **Response Example**:
```json
{
  "id": "651b148d5f8fd9e516290b8c",
  "email": "user@example.com",
  "name": "User Name",
  "password": "password123",
  "contact": {
    "whatsapp": "551188978564"
  }
  "createdAt": "2023-10-10T12:00:00.000Z",
  "updatedAt": "2023-10-10T12:00:00.000Z"
}
```

### User Authentication

- **Method**: `POST`
- **Endpoint**: `/login`
- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "password123",
  }
  ```
- **Response Example**:
```json
{
  "token": "651b148d5f8fd9e516290b8c",
  "expiresIn": 3600,
	"payload": {
		"id": "651b148d5f8fd9e516290b8c",
		"email": "user3@example.com",
		"name": "John Doe",
		"contact": {
			"whatsapp": "+1234567890"
		},
		"createdAt": "2023-10-02T19:05:49.618Z",
		"updatedAt": "2023-10-02T19:05:49.618Z"
	}
}
```

### User Profile

- **Method**: `GET`
- **Endpoint**: `/profile/{id}`
- **Request Header**: `Authorization: Bearer your-jwt-token`
- **Response Example**:
```json
  {
		"id": "651b148d5f8fd9e516290b8c",
		"email": "user3@example.com",
		"name": "John Doe",
		"contact": {
			"whatsapp": "+1234567890"
		},
		"createdAt": "2023-10-02T19:05:49.618Z",
		"updatedAt": "2023-10-02T19:05:49.618Z"
  }
```

### Update Password

- **Method**: `PATCH`
- **Endpoint**: `/profile/password/{id}`
- **Request Header**: `Authorization: Bearer your-jwt-token`
- **Request Body**:

  ```json
  {
    "currentPassword": "mypassword",
	  "newPassword": "newpassword"
  }
  ```
- **Response Example**: Status `204` (No content)


## Testing

To run tests using Jest, use the following command:

```bash
docker-compose exec app npm test
```

This command will execute the test suite for your Node.js API. Jest will run your tests and display the results in the terminal.

Feel free to expand your test suite to cover more scenarios and edge cases. Ensure that your tests provide good coverage for the functionality of your API.

Remember to update your .env.testing file with appropriate environment variables for testing, if necessary.

For integration tests that use a MongoDB database, consider using a testing database instance to isolate tests and prevent interference with your development database.

## Contributing
Contributions are welcome! Please feel free to submit issues or pull requests.
