/// <reference types="cypress" />

describe("gsn client", () => {
  beforeEach(() => {
    cy.visit(`/`);
  });
  it("has a Login button", () => {
    const button = cy.get(`body > nav > button`);
    button.should(`have.text`, `Login`);
  });
  it("redirects to /auth/login when Login button is clicked", () => {
    const button = cy.get(`body > nav > button`);
    button.click();
    cy.url().should("include", "/auth/login");
  });

  describe("/auth/login", () => {
    it("should have two input text boxes, Username and Password", () => {
      const login = cy.get(`body > nav > button`);
      login.click();
      cy.contains(`E-mail`).should("have.text", "E-mail");
      cy.contains(`Password`).should('have.text', "Password")
    });
    it("should load /auth/register, when register is clicked", () => {
      cy.visit(`/auth/login`)
      const registerLink = cy.contains(`Register`);
      registerLink.click();
      cy.url().should("include", "register")
    })
  });

  describe("/auth/register", ()=> {
    it("should create a unique user in the DB", () => {
      cy.visit("/auth/register")
      const btnEmail = cy.contains("E-mail").get('input#email')
      btnEmail.type(`jesus${Math.floor(1000 + Math.random() * 9000)}@gmail.com`)
      const btnUsername = cy.contains("Username").get('input#username')
      btnUsername.type(`jesus${Math.floor(1000 + Math.random() * 9000)}`)
      const btnPassword = cy.contains("Password").get('input#password')
      btnPassword.type("themouse")
      const btnContinue = cy.contains("Continue");
      btnContinue.click();
    })
  })
});
