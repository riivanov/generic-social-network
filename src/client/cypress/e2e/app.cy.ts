/// <reference types="cypress" />

describe('gsn client', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000`)
  })
  it('has a Login button', () => {
    const button = cy.get(`body > nav > button`);
    button.should(`have.text`, `Login`);
  })
})