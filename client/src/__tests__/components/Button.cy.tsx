import { mount } from "@cypress/react18";
import Button from "../../components/Button";

const text: string = "Submit";
const loadingText: string = "Loading";

describe("Button component test", () => {
  it("mounts", () => {
    mount(<Button>{text}</Button>);
    cy.get('[data-testid="component-button"]')
      .should("exist")
      .should("have.text", text);
  });

  it("show disabled button", () => {
    mount(<Button disabled>{text}</Button>);
    cy.get('[data-testid="component-button"]')
      .should("exist")
      .should("have.text", text)
      .should("be.disabled");
  });

  it("show loading button", () => {
    mount(<Button isLoading>{text}</Button>);
    cy.get('[data-testid="component-button"]')
      .should("exist")
      .should("have.text", loadingText)
      .find("svg")
      .should("have.class", "spinner");
  });
});
