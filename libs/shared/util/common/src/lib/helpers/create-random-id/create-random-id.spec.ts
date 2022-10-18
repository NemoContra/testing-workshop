import { createRandomId } from './create-random-id';

jest.mock('uuid', () => ({
  ...jest.requireActual('uuid'),
  v4: jest.fn().mockReturnValue('c1bfb6ed-5503-4549-8914-686553a408e1'),
}));

describe('createRandomId', () => {
  it('should create a random id with a prefix', () => {
    expect(createRandomId('test')).toMatchInlineSnapshot(
      `"test-c1bfb6ed-5503-4549-8914-686553a408e1"`
    );
  });

  it('should create a random id with a prefix and a custom separator', () => {
    expect(createRandomId('test', '###')).toMatchInlineSnapshot(
      `"test###c1bfb6ed-5503-4549-8914-686553a408e1"`
    );
  });
});
