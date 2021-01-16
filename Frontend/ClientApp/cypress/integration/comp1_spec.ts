describe('Comp 1 test', () =>
{
    beforeEach(() =>
    {
        cy.visit('/comp1');
    });

    it('increment should load articles', () =>
    {
        cy.contains('.text-center', '0');

        cy.contains('button', 'Increment').click();
        cy.contains('.text-center', '1');
        cy.wait(2000);

        cy.get('.col.json').each(el =>
        {
            const text = JSON.parse(el.text());
            expect(text.userId).to.eq(1);
        });

        cy.contains('button', 'Increment').click();
        cy.contains('.text-center', '2');
        cy.wait(2000);

        cy.get('.col.json').each(el =>
        {
            const text = JSON.parse(el.text());
            expect([1, 2]).to.include(text.userId);
        });
    });
});
