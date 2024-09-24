# Figma to Cypress Test Generator

This project automates the process of generating Cypress test cases from Figma designs using AI. It extracts information from a Figma JSON export and uses OpenAI's GPT model to create relevant test cases for your web application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Project Structure](#project-structure)
5. [Customization](#customization)

## Prerequisites

- Node.js (v14 or later)
- npm (comes with Node.js)
- An OpenAI API key

## Installation

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Set up your OpenAI API key as an environment variable:

   - On Unix-based systems:
     ```bash
     export OPENAI_API_KEY=your_api_key_here
     ```
   - On Windows:
     ```bash
     set OPENAI_API_KEY=your_api_key_here
     ```

## Usage

1. Export your Figma design as JSON and save it as `figma_data.json` in the project root.

2. Run the test generation script:

   ```bash
   node generate_test.js
   ```

3. The script will generate a Cypress test file at `cypress/e2e/login.cy.js`.

4. To run the generated Cypress tests:

   ```bash
   npx cypress run
   ```

   Or, to open the Cypress Test Runner:

   ```bash
   npx cypress open
   ```

## Project Structure

- `generate_test.js`: Main script for generating Cypress tests from Figma data
- `figma_data.json`: Figma design export (you need to provide this)
- `cypress/`: Directory containing Cypress tests and configuration
  - `e2e/`: Contains generated test files
  - `support/`: Cypress support files
- `cypress.config.js`: Cypress configuration file

## Customization

- Modify the `generateElementDescription` function in `generate_test.js` to change how Figma elements are described to the AI.
- Adjust the AI prompt in the `generateAITestCases` function to get different types of test cases.
- Edit `cypress.config.js` to change Cypress configuration settings.
