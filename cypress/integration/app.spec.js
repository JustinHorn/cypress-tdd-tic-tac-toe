/// <reference types="cypress" />

describe("App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  // it("Has a title", () => {
  //   cy.contains("Hello World!");
  // });

  // it("Has a button", () => {
  //   cy.on("window:alert", (txt) => {
  //     //Mocha assertions
  //     expect(txt).to.contains("Hello World!");
  //   });
  //   cy.contains("Hello World Alert").click();
  // });

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

      it("click same field twice", () => {
        cy.get("#field .tile:nth-child(1)").click().contains("X");
        cy.get("#field .tile:nth-child(1)").click().contains("X");
      });
    });
  });

  describe("game-over", () => {
    it("x-wins", () => {
      cy.get("#field .tile:nth-child(1)").click();
      cy.get("#field .tile:nth-child(4)").click();
      cy.get("#field .tile:nth-child(2)").click();
      cy.get("#field .tile:nth-child(5)").click();
      cy.get("#field .tile:nth-child(3)").click();
      cy.contains("Player X has won!");
    });

    it("O-wins", () => {
      cy.get("#field .tile:nth-child(1)").click();
      cy.get("#field .tile:nth-child(4)").click();
      cy.get("#field .tile:nth-child(2)").click();
      cy.get("#field .tile:nth-child(5)").click();
      cy.get("#field .tile:nth-child(7)").click();
      cy.get("#field .tile:nth-child(6)").click();
      cy.contains("Player O has won!");
    });

    it("X-wins-\\-diagonal", () => {
      cy.get("#field .tile:nth-child(1)").click();
      cy.get("#field .tile:nth-child(4)").click();
      cy.get("#field .tile:nth-child(5)").click();
      cy.get("#field .tile:nth-child(7)").click();
      cy.get("#field .tile:nth-child(9)").click();
      cy.contains("Player X has won!");
    });

    it("O-wins-/-diagonal", () => {
      cy.get("#field .tile:nth-child(1)").click();
      cy.get("#field .tile:nth-child(7)").click();
      cy.get("#field .tile:nth-child(2)").click();
      cy.get("#field .tile:nth-child(5)").click();
      cy.get("#field .tile:nth-child(4)").click();
      cy.get("#field .tile:nth-child(3)").click();
      cy.contains("Player O has won!");
    });
    it("draw", () => {
      cy.get("#field .tile:nth-child(1)").click();
      cy.get("#field .tile:nth-child(5)").click();
      cy.get("#field .tile:nth-child(2)").click();
      cy.get("#field .tile:nth-child(3)").click();
      cy.get("#field .tile:nth-child(7)").click();
      cy.get("#field .tile:nth-child(4)").click();
      cy.get("#field .tile:nth-child(6)").click();
      cy.get("#field .tile:nth-child(8)").click();
      cy.get("#field .tile:nth-child(9)").click();
      cy.contains("Player X has won!").should("not.exist");
      cy.contains("Player O has won!").should("not.exist");
      cy.contains("Game Over: DRAW!");
    });

    it("cant click after game over", () => {
      //
      cy.get("#field .tile:nth-child(1)").click();
      cy.get("#field .tile:nth-child(4)").click();
      cy.get("#field .tile:nth-child(2)").click();
      cy.get("#field .tile:nth-child(5)").click();
      cy.get("#field .tile:nth-child(3)").click();
      cy.contains("Player X has won!");

      cy.get("#field .tile:nth-child(7)").click();
      cy.get("#field .tile:nth-child(7)").contains("O").should("not.exist");
    });
  });

  describe("features", () => {
    it("restart the game", () => {
      cy.get("button").contains("restart");
      cy.get("#field .tile:first").click().contains("X");
      cy.get("button").contains("restart").click();
      cy.get("#field .tile:first").contains("X").should("not.exist");
    });
  });
});
