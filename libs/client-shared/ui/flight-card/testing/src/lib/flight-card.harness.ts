import {
  BaseHarnessFilters,
  ContentContainerComponentHarness,
  HarnessPredicate,
  TestElement,
} from '@angular/cdk/testing';

export enum FlightCardSelection {
  HEADER_TEXT = '[data-tid="header-text"]',
  FLIGHT_FROM = '[data-tid="flight-from"]',
  FLIGHT_TO = '[data-tid="flight-to"]',
  FLIGHT_NO = '[data-tid="flight-no"]',
  FLIGHT_DATE = '[data-tid="flight-date"]',
  FLIGHT_DELAYED = '[data-tid="flight-delayed"]',
  SELECT_BUTTON = '[data-tid="select-button"]',
  DESELECT_BUTTON = '[data-tid="deselect-button"]',
}

export interface FlightCardHarnessFilters extends BaseHarnessFilters {
  text?: string | RegExp;
  flightNo?: string | RegExp;
  flightFrom?: string | RegExp;
  flightTo?: string | RegExp;
}

export class ClientSharedUiFlightCardHarness extends ContentContainerComponentHarness<FlightCardSelection> {
  static hostSelector = '[data-tid="flight-card"]';

  private headerText = this.locatorFor(FlightCardSelection.HEADER_TEXT);
  private flightFrom = this.locatorFor(FlightCardSelection.FLIGHT_FROM);
  private flightTo = this.locatorFor(FlightCardSelection.FLIGHT_TO);
  private flightNo = this.locatorFor(FlightCardSelection.FLIGHT_NO);
  private flightDate = this.locatorFor(FlightCardSelection.FLIGHT_DATE);
  private flightDelayed = this.locatorFor(FlightCardSelection.FLIGHT_DELAYED);
  private selectButton = this.locatorForOptional(
    FlightCardSelection.SELECT_BUTTON
  );
  private deselectButton = this.locatorForOptional(
    FlightCardSelection.DESELECT_BUTTON
  );

  static with(
    options: FlightCardHarnessFilters
  ): HarnessPredicate<ClientSharedUiFlightCardHarness> {
    return new HarnessPredicate(ClientSharedUiFlightCardHarness, options)
      .addOption('flightNo', options.flightNo, (harness, flightNo) =>
        HarnessPredicate.stringMatches(harness.getFlightNo(), flightNo)
      )
      .addOption('flightFrom', options.flightFrom, (harness, flightFrom) =>
        HarnessPredicate.stringMatches(harness.getFlightFrom(), flightFrom)
      )
      .addOption('flightTo', options.flightTo, (harness, flightTo) =>
        HarnessPredicate.stringMatches(harness.getFlightTo(), flightTo)
      );
  }

  async getText(): Promise<string> {
    return (await this.host()).text();
  }

  async getHeaderText(): Promise<string> {
    return (await this.headerText()).text();
  }

  async getFlightFrom(): Promise<string> {
    return (await this.flightFrom()).text();
  }

  async getFlightTo(): Promise<string> {
    return (await this.flightTo()).text();
  }

  async getFlightNo(): Promise<string> {
    return (await this.flightNo()).text();
  }

  async getFlightDate(): Promise<string> {
    return (await this.flightDate()).text();
  }

  async getFlightDelayed(): Promise<boolean> {
    return (await (await this.flightDelayed()).text()) === 'yes';
  }

  getSelectButton(): Promise<TestElement | null> {
    return this.selectButton();
  }

  getDeselectButton(): Promise<TestElement | null> {
    return this.deselectButton();
  }

  async select(): Promise<void> {
    (await this.getSelectButton())?.click();
  }

  async deselect(): Promise<void> {
    (await this.getDeselectButton())?.click();
  }

  async isSelected(): Promise<boolean> {
    return (
      (await (await this.host()).getAttribute('data-is-selected')) === 'true'
    );
  }
}
