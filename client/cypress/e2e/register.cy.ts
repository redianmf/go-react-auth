import { dummyUser } from "./dummyUser";

describe("register flow test", () => {
  beforeEach(function () {
    cy.visit("/auth");
  });

  it("should render register forms", () => {
    // Switch to register form
    cy.get('[data-testid="switch-to-register"]').click();

    cy.get('[data-testid="name"]').should("exist");
    cy.get('[data-testid="email"]').should("exist");
    cy.get('[data-testid="password"]').should("exist");
    cy.get('[data-testid="confirm-password"]').should("exist");
    cy.get('[data-testid="submit-register"]').should("exist");
    cy.get('[data-testid="switch-to-login"]').should("exist");
  });

  it("should not be able to register if form is invalid", () => {
    // Switch to register form
    cy.get('[data-testid="switch-to-register"]').click();

    // Fill form
    cy.get('[data-testid="name"]').type(dummyUser.name);
    cy.get('[data-testid="email"]').type(dummyUser.email);
    cy.get('[data-testid="password"]').type(dummyUser.password);
    cy.get('[data-testid="confirm-password"]').type(
      dummyUser.confirmWrongPassword
    );

    // Check if submit button disabled
    cy.get('[data-testid="submit-register"]').should("be.disabled");

    // Check if form error displayed
    cy.get('[data-testid="input-error"]').should("exist");
  });

  it("should be able to register", () => {
    // Switch to register form
    cy.get('[data-testid="switch-to-register"]').click();

    // Fill form
    cy.get('[data-testid="name"]').type(dummyUser.name);
    cy.get('[data-testid="email"]').type(dummyUser.email);
    cy.get('[data-testid="password"]').type(dummyUser.password);
    cy.get('[data-testid="confirm-password"]').type(
      dummyUser.confirmTruePassword
    );

    // Check if no form error
    cy.get('[data-testid="input-error"]').should("not.exist");

    // Submit data
    cy.get('[data-testid="submit-register"]').click();

    // Check if success alert appeared
    cy.get('[data-testid="success-register"]').should("exist");

    // Check if form is cleared
    cy.get('[data-testid="name"]').should("have.value", "");
    cy.get('[data-testid="email"]').should("have.value", "");
    cy.get('[data-testid="password"]').should("have.value", "");
    cy.get('[data-testid="confirm-password"]').should("have.value", "");
  });
});
