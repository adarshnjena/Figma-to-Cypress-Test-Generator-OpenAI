const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This will be undefined if the env var is not set
});

// Helper function to convert Figma color object to CSS rgba
function figmaColorToCss(color) {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

// Helper function to generate element description
function generateElementDescription(element) {
  let description = `${element.type} named "${element.name}"`;
  if (element.type === "TEXT") {
    description += ` with text "${element.characters}"`;
  } else if (element.type === "RECTANGLE" || element.type === "FRAME") {
    description += ` with dimensions ${element.width}x${element.height}`;
  }
  return description;
}

// Function to recursively process elements
function processElements(element) {
  let descriptions = [generateElementDescription(element)];
  if (element.children) {
    element.children.forEach((child) => {
      descriptions = descriptions.concat(processElements(child));
    });
  }
  return descriptions;
}

// Function to extract JavaScript code from AI response
function extractJavaScriptCode(aiResponse) {
  const codeRegex = /```javascript([\s\S]*?)```/;
  const match = aiResponse.match(codeRegex);
  if (match && match[1]) {
    return match[1].trim();
  }
  return null;
}

// Function to generate AI-enhanced test cases
async function generateAITestCases(figmaJson) {
  if (!openai.apiKey) {
    console.warn(
      "OpenAI API key is not set. Skipping AI-generated test cases."
    );
    return null;
  }

  const elementDescriptions = processElements(figmaJson).join("\n");

  const messages = [
    {
      role: "system",
      content:
        "You are a helpful assistant that generates Cypress test cases based on Figma designs.",
    },
    {
      role: "user",
      content: `
Given a login page with the following elements:
${elementDescriptions}

Generate Cypress test cases to thoroughly test this login page. Include tests for:
1. Existence and visibility of all elements
2. Proper styling and positioning
3. Form validation (e.g., email format, required fields)
4. Successful and unsuccessful login attempts
5. Any interactive elements like buttons or links
6. Responsive design (if applicable)

Provide the test cases in Cypress syntax, wrapped in a JavaScript code block. Do not include any explanatory text outside the code block.
    `,
    },
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const aiResponse = response.choices[0].message.content.trim();
    const extractedCode = extractJavaScriptCode(aiResponse);
    return extractedCode || aiResponse; // Fallback to full response if extraction fails
  } catch (error) {
    console.error("Error generating AI test cases:", error);
    return null;
  }
}

// Main function to generate Cypress test from Figma JSON
async function generateCypressTest(figmaJson) {
  const aiTestCases = await generateAITestCases(figmaJson);

  const testContent = `
describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');  // Update with your actual URL
  });

  ${
    aiTestCases ||
    "// AI-generated test cases could not be created. Please add manual test cases here."
  }

  it('should match the Figma design visually', () => {
    cy.percySnapshot('Login Page');
  });
});
`;

  return testContent;
}

// Read Figma JSON data
const figmaJsonPath = path.join(__dirname, "figma_data.json");
const figmaData = JSON.parse(fs.readFileSync(figmaJsonPath, "utf8"));

// Generate Cypress test
async function main() {
  const cypressTest = await generateCypressTest(figmaData);

  // Ensure the directory exists
  const outputDir = path.join(__dirname, "cypress", "e2e");
  fs.mkdirSync(outputDir, { recursive: true });

  // Write Cypress test to file
  const outputPath = path.join(outputDir, "login.cy.js");
  fs.writeFileSync(outputPath, cypressTest);

  console.log(`Cypress test generated successfully: ${outputPath}`);
}

main().catch(console.error);
