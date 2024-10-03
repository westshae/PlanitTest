describe('ContactForm', () => {
    Cypress._.times(5, () => {
        it('After 30 seconds, it should show a success message.', () => {
            cy.visit('https://jupiter.cloud.planittesting.com/#/contact');
            cy.reload()
            cy.get('input[name="forename"]').type("Forename")
            cy.get('input[name="surname"]').type("Surname")
            cy.get('input[name="email"]').type("Email@email.com")
            cy.get('input[name="telephone"]').type("012123123")
            cy.get('textarea[name="message"]').type("Message")
            cy.get('.btn-contact').click()
            cy.get(".alert-error").should('not.exist')
            cy.wait(10000).then(() => {
                cy.get(".alert-success").should('be.visible')
            });
        });
    });
});
