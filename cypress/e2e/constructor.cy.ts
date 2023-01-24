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



