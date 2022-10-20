import { AddService, CalculatorService } from './calculator.service';
import { of } from 'rxjs';
import { createSpyObserver } from '@testing-workshop/shared/util/test-helpers';

describe('CalculatorService', () => {
  let addService: AddService;
  let calculatorService: CalculatorService;

  beforeEach(() => {
    addService = new AddService();
    jest.spyOn(addService, 'calculate').mockReturnValue(of(1));
    calculatorService = new CalculatorService(addService);
  });

  it.each`
    nr1         | nr2
    ${1}        | ${1}
    ${-1}       | ${-1}
    ${1000000}  | ${2000000}
    ${-1000000} | ${-2000000}
  `('should add $nr1 and $nr2', ({ nr1, nr2 }) => {
    const spyOberserver = createSpyObserver();

    calculatorService.add(nr1, nr2).subscribe(spyOberserver);
    expect(spyOberserver).toMatchSnapshot();
  });

  it('should throw an error for negative values', () => {
    const spyOberserver = createSpyObserver();

    calculatorService.addUnsigned(-1, -2).subscribe(spyOberserver);
    expect(spyOberserver).toMatchSnapshot();
  });
});
