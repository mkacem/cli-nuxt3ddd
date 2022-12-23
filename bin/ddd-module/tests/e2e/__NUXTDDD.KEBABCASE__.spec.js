describe('Post Test', () => {
  it('Visits page posts', () => {
    cy.visit('http://localhost:3000/en/__NUXTDDD.KEBABCASE__');
    const text = 'test input';
    __PLUGIN###cy.focused().should('id', 'search');###
    cy.get('#search').type(text);
    cy.get('#searchText').invoke('text')
     .then(sometext => cy.expect(sometext.trim().replace(/[/\n]/g,'')).equal(text));
  })
})
