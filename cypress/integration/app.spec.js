/// <reference types="cypress" />

describe("App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Has a title", () => {
    cy.contains("Hello World!");
  });

  it("Has a button", () => {
    cy.on("window:alert", (txt) => {
      //Mocha assertions
      expect(txt).to.contains("Hello World!");
    });
    cy.contains("Hello World Alert").click();
  });

  describe("field", () => {
    it("should have 9 tiles", () => {
      cy.get("#field").children().should("have.length", 9);
      cy.get("#field").children().should("be.visible", 9);
    });

    describe("tile", () => {
      it("first click", () => {
        cy.get("#field .tile:first").click().contains("X");
      });
      it("second click", () => {
        cy.get("#field .tile:first").click().contains("X");
        cy.get("#field .tile:nth-child(2)").click().contains("O");
      });
    });
  });

  describe("game-ends", () => {
    it("x-wins", () => {
      cy.get("#field .tile:nth-child(1)").click();
      cy.get("#field .tile:nth-child(4)").click();
      cy.get("#field .tile:nth-child(2)").click();
      cy.get("#field .tile:nth-child(5)").click();
      cy.get("#field .tile:nth-child(3)").click();
      cy.contains("Player X has won!");
    });
  });
});
