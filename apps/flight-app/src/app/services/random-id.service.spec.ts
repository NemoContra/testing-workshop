import { RandomIdService } from './random-id.service';
import { v4 } from 'uuid';

jest.mock('uuid', () => ({
  ...jest.requireActual('uuid'),
  v1: jest.fn().mockReturnValue('a27dc23b-4de6-4989-a67f-20537f8961b6'),
  v4: jest.fn().mockReturnValue('8a2e545a-6f2f-47c9-b879-b23ab1d84f33'),
}));

describe('RandomIdService', () => {
  let randomIdService: RandomIdService;

  beforeEach(() => {
    randomIdService = new RandomIdService();
  });

  it('should return a unique id v4', () => {
    expect(randomIdService.getUuidV4()).toMatchInlineSnapshot(
      `"8a2e545a-6f2f-47c9-b879-b23ab1d84f33"`
    );
    expect(v4).toHaveBeenCalled();
  });

  it('should return a unique id v1', () => {
    expect(randomIdService.getUuidV1()).toMatchInlineSnapshot(
      `"a27dc23b-4de6-4989-a67f-20537f8961b6"`
    );
  });
});
