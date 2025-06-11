describe("e2e тестирование компонента constructor", () => {

    beforeEach(() => {
        cy.setCookie('accessToken', 'test_accessToken');
        localStorage.setItem('refreshToken', 'test_refreshToken');
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' })
        cy.visit('/');
    });

    before(()=>{
        cy.intercept('GET', `api/ingredients`, { fixture: 'ingredients.json' }); 
    })

    it('тестирование добавления ингредиента в конструктор', () => {
        cy.get('[data-cy="bun"]').first().within(() => {
            cy.get('button').contains('Добавить').click();
        });
        cy.get('[data-cy="main"]').first().within(() => {
            cy.get('button').contains('Добавить').click();
        });
        cy.get('[data-cy="constructor_bun"]').should('exist');
        cy.get('[data-cy="constructor_main"]').should('exist');

    })

    it('открытие/закрытие модального окна ингредиента по клику на крестик', () => {
        cy.get('[data-cy="bun"]').first().click();
        cy.get('[data-cy="button_modal_close"]').click();

    })

    it('закрытие модального окна ингредиента по клику на overlay', () => {
         cy.visit('/');
        cy.get('[data-cy="bun"]').first().click();
        cy.get('[data-cy="modal_overlay"]').click({ force: true });
    })

    before(()=>{
        cy.intercept('GET', `api/ingredients`, { fixture: 'ingredients.json' });
    })

    it('Оформление заказа', () => {
        
        cy.fixture("createOrder.json").then((orderData) => {
            cy.intercept('POST', 'api/orders', { fixture: 'createOrder.json' }).as('createOrder');
           
            cy.get('[data-cy="bun"]').first().within(() => {
                cy.get('button').contains('Добавить').click();
            });
            cy.get('[data-cy="main"]').first().within(() => {
                cy.get('button').contains('Добавить').click();
            });
            
            cy.get('[data-cy="button_createOrder"]').click();

            cy.get('#modals').children().should('be.visible');
            cy.get('[data-cy="new_order_number"]').should('contain', orderData.order.number);

            cy.get('[data-cy="button_modal_close"]').click();
            cy.get('[data-testid="order-modal"]').should('not.exist');

            
            cy.get('[data-cy="constructor_bun"]').should('not.exist');
            cy.get('[data-cy="constructor_main"]').children().should('have.length', 1);

            
        });
    });
})

after(() => {
    cy.clearCookies();
    localStorage.removeItem('refreshToken');
})

