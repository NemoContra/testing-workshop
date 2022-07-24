import { API_URL } from './api-url';

describe('API_URL', () => {
  it('should match snapshot', () => {
    expect(API_URL).toMatchInlineSnapshot(`"/api"`);
  });
});
