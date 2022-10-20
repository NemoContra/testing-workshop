import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let calculatorService: CalculatorService;

  beforeEach(() => {
    calculatorService = new CalculatorService();
  });

  it.each([
    { nr1: 1, nr2: 1 },
    { nr1: -1, nr2: -1 },
    { nr1: 1000000, nr2: 2000000 },
    { nr1: -1000000, nr2: -2000000 },
  ])('should add $nr1 and $nr2', ({ nr1, nr2 }) => {
    expect(calculatorService.add(nr1, nr2)).toMatchSnapshot('result');
  });
});
