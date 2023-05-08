export interface PageModel {
  SELECTORS: object;
  navigateTo(): Promise<void>;
  verifyRequiredElementsPresent(): Promise<void>;
}
