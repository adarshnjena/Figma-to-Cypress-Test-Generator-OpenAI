
describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');  // Update with your actual URL
  });

  describe('Login Page Tests', () => {
    beforeEach(() => {
        cy.visit('url_to_login_page');
    });

    it('Should check existence and visibility of all elements', () => {
        cy.get('[data-testid="Login"]').should('be.visible');
        cy.get('[data-testid="Rectangle 1"]').should('be.visible');
        cy.contains('Back to your digital life').should('be.visible');
        cy.contains('Choose one of the option to go').should('be.visible');
        cy.get('[data-testid="Rectangle 2"]').should('be.visible');
        cy.get('[data-testid="Rectangle 3"]').should('be.visible');
        cy.contains('get@ziontutorial.com').should('be.visible');
        cy.contains('Password').should('be.visible');
        cy.contains('Or continue with').should('be.visible');
        cy.get('[data-testid="Line 1"]').should('be.visible');
        cy.get('[data-testid="Rectangle 4"]').should('be.visible');
        cy.get('[data-testid="Rectangle 5"]').should('be.visible');
        cy.get('[data-testid="Rectangle 6"]').should('be.visible');
        cy.get('[data-testid="Group 1"]').should('be.visible');
        cy.get('[data-testid="Rectangle 7"]').should('be.visible');
        cy.contains('Log in').should('be.visible');
    });

    it('Should check proper styling and positioning of elements', () => {
        // Add assertions for styling and positioning here
    });

    it('Should test form validation for email format and required fields', () => {
        // Add test for form validation here
    });

    it('Should test successful login attempt', () => {
        // Add test for successful login attempt here
    });

    it('Should test unsuccessful login attempt', () => {
        // Add test for unsuccessful login attempt here
    });

    it('Should test interactive elements like buttons or links', () => {
        // Add test for interactive elements here
    });

    it('Should test responsive design', () => {
        // Add test for responsive design here
    });
});

  it('should match the Figma design visually', () => {
    cy.percySnapshot('Login Page');
  });
});
