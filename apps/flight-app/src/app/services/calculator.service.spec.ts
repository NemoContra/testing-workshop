import { AddService, CalculatorService } from './calculator.service';
import { createSpyObserver } from '@testing-workshop/shared/util/test-helpers';
import { createServiceFactory, mockProvider } from '@ngneat/spectator/jest';
import { of, throwError } from 'rxjs';

describe('CalculatorService', () => {
  const createService = createServiceFactory({
    service: CalculatorService,
    providers: [mockProvider(AddService)],
  });

  it.each`
    nr1         | nr2
    ${1}        | ${1}
    ${-1}       | ${-1}
    ${1000000}  | ${2000000}
    ${-1000000} | ${-2000000}
  `('should add $nr1 and $nr2', ({ nr1, nr2 }) => {
    const spectator = createService();
    const spyOberserver = createSpyObserver();
    const addService = spectator.inject(AddService);
    addService.calculate.mockReturnValue(of(1));

    spectator.service.add(nr1, nr2).subscribe(spyOberserver);
    expect(spyOberserver).toMatchSnapshot();
  });

  it('should throw an error for negative values', () => {
    const spectator = createService();
    const spyOberserver = createSpyObserver();
    const addService = spectator.inject(AddService);
    addService.calculateUnsigned.mockReturnValue(
      throwError(() => new Error('Both numbers must be greater than zero'))
    );

    spectator.service.addUnsigned(-1, -2).subscribe(spyOberserver);
    expect(addService.calculateUnsigned).toHaveBeenCalled();
    expect(spyOberserver).toMatchSnapshot();
  });
});
