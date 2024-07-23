import { dummyUser } from "./dummyUser";

describe("login flow test", () => {
  beforeEach(function () {
    cy.visit("/auth");
  });

  it("should render login forms", () => {
    cy.get('[data-testid="email"]').should("exist");
    cy.get('[data-testid="password"]').should("exist");
    cy.get('[data-testid="submit-login"]').should("exist");
    cy.get('[data-testid="switch-to-register"]').should("exist");
  });

  it("should be able to login", () => {
    // Fill form and submit
    cy.get('[data-testid="email"]').type(dummyUser.email);
    cy.get('[data-testid="password"]').type(dummyUser.password);
    cy.get('[data-testid="submit-login"]').click();

    // Redirected to homepage
    cy.location("pathname").should("eq", "/");

    // Showing correct username
    cy.get('[data-testid="username"]').should("have.text", dummyUser.name);
  });
});
