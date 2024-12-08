const addToCart = (productId, quantity) => {
    cy.get(`#product-${productId}`).find('.btn-success').then(($button) => {
        for (let i = 0; i < quantity; i++) {
            cy.wrap($button).click();
        }
    });
};

describe('Cart', () => {
    it('Add items to cart, confirm their price, subtotal price, and total price.', () => {
        cy.visit('https://jupiter.cloud.planittesting.com/#/shop');
        addToCart(2, 2)//Stuffed Frog, ID 2, two items.
        addToCart(4, 5)//Fluffy Bunny, ID 4, 5 times.
        addToCart(7, 3)//Valentine Bear, ID 7, 3 times.
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
