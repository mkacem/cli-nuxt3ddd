import schema from './schema.json';
import config from '../../config.json';

var api = Cypress.env('env') == 'dev' ? config.envDev.API_MOCK : config.env.API_MOCK;

/* posts list spec   */
describe(
  'api __NUXTDDD.CAMELCASE__ posts list ' + config[Cypress.env('env') == 'dev' && config.envDev ? 'envDev' : 'env'].POSTS,
  () => {    
    it('compare schema for posts list', () => {
      cy.request({
        method: 'GET',
        url: api + config[Cypress.env('env') == 'dev' && config.envDev ? 'envDev' : 'env'].POSTS
      }).then(async (res) => {
        expect(res.status).equal(200);
        if (Object.keys(res.body).length > 0) {
          let test = cy.testapi.schemaValidate(schema, res.body[0]);
          expect(test.length).equal(0, JSON.stringify(test));
        }
      });
    });
  }
);

/* post details spec   */
describe(
  'api __NUXTDDD.CAMELCASE__ post details ' +
    config[Cypress.env('env') == 'dev' && config.envDev ? 'envDev' : 'env'].POST.replace(/:id/,1),
  () => {
    it('compare schema for post details', () => {
      cy.request({
        method: 'GET',
        url:
          api +
          config[Cypress.env('env') == 'dev' && config.envDev ? 'envDev' : 'env'].POST.replace(/:id/,1) 
      }).then(async (res) => {
        expect(res.status).equal(200);
        if (Object.keys(res.body).length > 0) {
          let test = cy.testapi.schemaValidate(schema, res.body);
          expect(test.length).equal(0, JSON.stringify(test));
        }
      });
    });
  }
);

