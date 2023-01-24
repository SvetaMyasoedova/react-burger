/* eslint-disable cypress/no-unnecessary-waiting */
// import cy from "cypress"
/// <reference types="cypress" />

describe('service is available', function() {
  it('should be available on localhost:3000', function() {
    cy.visit('http://localhost:3000');
  });
}); 

it('should drag & drop', function () {
  cy.visit('http://localhost:3000');
  cy.get('[id="60d3b41abdacab0026a733c6"]').trigger('dragstart');
  cy.get('[data-test-id="burger-container"]').trigger('drop');
  cy.get('span').contains('Краторная булка N-200i (верх)');
});

it('should ingredient modal  & close', function () {
  cy.visit('http://localhost:3000');
  cy.get('[id="60d3b41abdacab0026a733c6"]').click();
  cy.get('[data-test-id="ingredient-name"]').contains('Краторная булка N-200i');
  cy.get('[data-test-id="ingredient-calories"]').contains('420');
  cy.get('[data-test-id="ingredient-proteins"]').contains('80');
  cy.get('[data-test-id="ingredient-fat"]').contains('24');
  cy.get('[data-test-id="ingredient-carbohydrates"]').contains('53');
  cy.wait(4000);
  cy.get('[data-test-id="modal-close-icon"]').click();
  cy.wait(1000);
  cy.get('[data-test-id="modal-close-icon"]').should('not.exist');
});



