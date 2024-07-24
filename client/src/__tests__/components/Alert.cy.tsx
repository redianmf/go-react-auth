import { mount } from "@cypress/react18";
import Alert from "../../components/Alert";
import { AlertType } from "../../types/types";

const message: string = "This is alert";

describe("Alert component test", () => {
  it("can be mounted", () => {
    mount(<Alert message={message} />);
    cy.get('[data-testid="component-alert"]')
      .should("exist")
      .should("have.text", message);
  });

  it("show error alert", () => {
    mount(<Alert message={message} type={AlertType.ERROR} />);
    cy.get('[data-testid="component-alert"]')
      .should("exist")
      .should("have.text", message)
      .should("have.class", "bg-red-500");
  });

  it("show warning alert", () => {
    mount(<Alert message={message} type={AlertType.WARNING} />);
    cy.get('[data-testid="component-alert"]')
      .should("exist")
      .should("have.text", message)
      .should("have.class", "bg-yellow-500");
  });

  it("show success alert", () => {
    mount(<Alert message={message} type={AlertType.SUCCESS} />);
    cy.get('[data-testid="component-alert"]')
      .should("exist")
      .should("have.text", message)
      .should("have.class", "bg-green-500");
  });
});
