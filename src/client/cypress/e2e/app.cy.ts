/// <reference types="cypress" />

describe('gsn client', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000`)
  })
  it('has a Login button', () => {
    const button = cy.get(`body > nav > button`);
    button.should(`have.text`, `Login`);
  })
  it('redirects to /auth/login when Login button is clicked', () => {
    const button = cy.get(`body > nav > button`);
    button.click();
    cy.url().should('include', '/auth/login')
    cy.get('body > div > form > label:nth-child(1)').should('have.text', 'Username:')
    cy.get('body > div > form > label:nth-child(3)').should('have.text', 'Password:')
  })
})