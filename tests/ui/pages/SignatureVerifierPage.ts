import { BasePage } from "./BasePage";
import { PageModel } from "../../../interfaces/PageModel.interface";
import { expect, Page } from "@playwright/test";
import { MainHeaderComponent } from "./components/MainHeaderComponent";

export class SignatureVerifierPage extends BasePage implements PageModel {

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  public SELECTORS = {
    MAIN_HEADER: new MainHeaderComponent(this.page).MAIN_HEADER,
    WALLET_ADDRESS_INPUT: this.page.locator("#address"),
    MESSAGE_INPUT: this.page.locator("#message"),
    SIGN_MASSAGE_BUTTON: this.page.getByRole('button', { name: 'Sign the message' }),
    VERIFY_SIGNATURE_BUTTON: this.page.getByRole('button', { name: 'Verify the signature' }),
    SIGNATURE: this.page.locator('.body > div:nth-child(3)'),
  };

  async navigateTo(): Promise<void> {
    await this.page.goto(this.url);
  }

  async verifyRequiredElementsPresent(): Promise<void> {
    await expect(this.page).toHaveTitle(/Recipient Demo/);
    await expect(this.SELECTORS.MAIN_HEADER.LOGO).toBeVisible();
    await expect(this.SELECTORS.MAIN_HEADER.CONNECT_BUTTON).toBeVisible();
    await expect(this.SELECTORS.WALLET_ADDRESS_INPUT).toBeVisible();
    await expect(this.SELECTORS.MESSAGE_INPUT).toBeVisible();
    await expect(this.SELECTORS.SIGN_MASSAGE_BUTTON).toBeVisible();
    await expect(this.SELECTORS.VERIFY_SIGNATURE_BUTTON).toBeVisible();
  }
}
