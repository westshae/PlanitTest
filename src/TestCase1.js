describe('ContactForm', () => {
    it('Submit contact form empty, ensure errors, populate fields, ensure no errors', () => {
        cy.visit('https://jupiter.cloud.planittesting.com/#/contact');
        cy.get('.btn-contact').click()
        cy.get(".alert-error").should('be.visible')
        cy.get('input[name="forename"]').type("Forename")
        cy.get('input[name="surname"]').type("Surname")
        cy.get('input[name="email"]').type("Email@email.com")
        cy.get('input[name="telephone"]').type("012123123")
        cy.get('textarea[name="message"]').type("Message")
        cy.get('.btn-contact').click()
        cy.get(".alert-error").should('not.exist')
    });
});
