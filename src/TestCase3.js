describe('Cart', () => {
    it('Add items to cart, confirm their price, subtotal price, and total price.', () => {
        cy.visit('https://jupiter.cloud.planittesting.com/#/shop');
        cy.get('#product-2')//Stuffed Frog
            .find('.btn-success')
            .click()
            .click();
        cy.get('#product-4')//Fluffy Bunny
            .find('.btn-success')
            .click()
            .click()
            .click()
            .click()
            .click();
        cy.get('#product-7')//Valentine Bear
            .find('.btn-success')
            .click()
            .click()
            .click();
        cy.visit('https://jupiter.cloud.planittesting.com/#/cart');

        const expectedProducts = [
            { name: 'Stuffed Frog', price: '$10.99', subtotal: '$21.98' },
            { name: 'Fluffy Bunny', price: '$9.99', subtotal: '$49.95' },
            { name: 'Valentine Bear', price: '$14.99', subtotal: '$44.97' }
        ];
        expectedProducts.forEach((product, index) => {
            cy.get('tr.cart-item.ng-scope').eq(index)
                .within(() => {
                    cy.get('td').eq(0).should('include.text', product.name)
                    cy.get('td').eq(1).should('have.text', product.price);
                    cy.get('td').eq(3).should('have.text', product.subtotal);
                });
        });

        cy.get(".total")
            .invoke("text")
            .should('eq', 'Total: 116.9');

    });
});
