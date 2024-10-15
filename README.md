# Web Dev Interview

## Table of Contents

- [Installation](#installation)
- [Run the App](#run-the-app)
- [Run Tests](#run-tests)
- [Additional Implementation Details](#implementation-details)

## Installation

To install and run this project on your local machine, follow these steps:

1. Clone the repository

   ```bash
   git clone https://github.com/haphuong96/web-developer-interview.git
   cd web-developer-interview
   ```

2. Install dependencies

   ```bash
    npm install
   ```

## Run the App

1. Run command

   ```bash
   npm run dev
   ```

2. Open your browser and go to http://localhost:5173

## Run Tests

   ```bash
   npm run test
   ```

You can also go to coverage folder to see the test coverage report

## Additional Implementation Details

### Frontend Mock Filtering and Search

Since the API endpoints in this project return static responses, the filtering and search functionalities are implemented entirely on the frontend. When a user performs a search or applies filters, the fetched static data is filtered based on the keyword directly in the client.

- Return search results with the search term in the title of the items, case-insensitive.
- Return search suggestions with the search term in the suggestion content, case-sensitive
