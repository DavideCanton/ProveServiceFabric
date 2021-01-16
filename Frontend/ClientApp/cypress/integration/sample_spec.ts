describe('Index Test', () =>
{
    beforeEach(() =>
    {
        cy.visit('/');
    });

    for (let i = 1; i <= 6; i++)
    {
        it(`Index should contain link to component ${i}`, () =>
        {
            cy.contains('a', `Comp${i}`);
        });

        it(`Link to component ${i} should navigate to correct page`, () =>
        {
            cy.contains('a', `Comp${i}`).click();
            cy.url().should('include', `/comp${i}`);
        });
    }

});
