import { expect, Page } from "@playwright/test";
import { PageModel } from "../../interfaces/PageModel.interface";
import { BasePage } from "./pages/BasePage";

export class MetaMaskExtension extends BasePage implements PageModel {
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = "chrome-extension://gkjmfhibmenecmkkailobidnohhlljeb/home.html";
  }

  public SELECTORS = {
    ONBOARDING_VIEW: {
      AGREE_CHECKBOX: this.page.locator('input[data-testid="onboarding-terms-checkbox"]'),
      IMPORT_WALLET_BUTTON: this.page.locator('button[data-testid="onboarding-import-wallet"]'),
    },
    IMPROVE_VIEW: {
      NO_THANKS_BUTTON: this.page.locator('button[data-testid="metametrics-no-thanks"]'),
    },
    CREATE_PASSWORD_VIEW: {
      PASSWORD_INPUT: this.page.locator('input[data-testid="create-password-new"]'),
      CONFIRM_PASSWORD_IMPUT: this.page.locator('input[data-testid="create-password-confirm"]'),
      ACCEPT_TERMS_CHECKBOX: this.page.locator('input[data-testid="create-password-terms"]'),
      IMPORT_MY_WALLET_BUTTON: this.page.locator('button[data-testid="create-password-import"]'),
    },
    SECRET_RECOVERY_VIEW: {
      WORD_INPUT: (index: number) => {
        return this.page.locator(`input[data-testid="import-srp__srp-word-${index}"]`);
      },
      CONFIRM_BUTTON: this.page.locator('button[data-testid="import-srp-confirm"]'),
    },
    WALLET_CREATION_SUCCESSFUL_VIEW: {
      GOT_IT_BUTTON: this.page.locator('button[data-testid="onboarding-complete-done"]'),
    },
    INSTALL_COMPLETE_VIEW: {
      NEXT_BUTTON: this.page.locator('button[data-testid="pin-extension-next"]'),
      DONE_BUTTON: this.page.locator('button[data-testid="pin-extension-done"]'),
    },
    WHATS_NEW: {
      CLOSE_BUTTON: this.page.getByRole('button', { name: 'close' }),
    },
    CONNECT_WITH_METAMASK_VIEW: {
      SITE_TO_CONNECT: this.page.locator('div.site-origin span.box'),
      TITLE: this.page.locator('.permissions-connect-header__title'),
      NEXT_BUTTON: this.page.locator('.permissions-connect-choose-account__bottom-buttons .btn-primary'),
      CANSEL_BUTTON: this.page.getByRole('button', { name: 'Cansel' }),
    },
    CONNECT_TO_ACCOUNT_VIEW: {
      CONNECT_BUTTON: this.page.getByRole('button', { name: 'CONNECT' }),
      CANSEL_BUTTON: this.page.getByRole('button', { name: 'Cansel' }),
    },
    SIGNATURE_REQUEST_VIEW: {
      SIGN_BUTTON: this.page.locator('button[data-testid="page-container-footer-next"]'),
      REJECT_BUTTON: this.page.getByRole('button', { name: 'Reject' }),
      MESSAGE: this.page.locator('.request-signature__row-value'),
    }
  };

  async navigateTo(): Promise<void> {
    await this.page.goto(this.url);
  }

  async verifyRequiredElementsPresent(): Promise<void> {
    await expect(this.page).toHaveTitle(/MetaMask/);
    await expect(this.SELECTORS.ONBOARDING_VIEW.AGREE_CHECKBOX).toBeVisible({
      timeout: 10 * 1000,
    });
  }

  async typePassphrase(passphrase: string[] ): Promise<void> {
    for (let i = 0; i < passphrase.length; i++) {
      await this.SELECTORS.SECRET_RECOVERY_VIEW.WORD_INPUT(i).fill(passphrase[i])
    }
  }

  async importWallet(passphrase, password: string): Promise<void> {
    await this.SELECTORS.ONBOARDING_VIEW.AGREE_CHECKBOX.click();
    await this.SELECTORS.ONBOARDING_VIEW.IMPORT_WALLET_BUTTON.click();

    await this.SELECTORS.IMPROVE_VIEW.NO_THANKS_BUTTON.click();

    await this.typePassphrase(passphrase);
    await this.SELECTORS.SECRET_RECOVERY_VIEW.CONFIRM_BUTTON.click();

    await this.SELECTORS.CREATE_PASSWORD_VIEW.PASSWORD_INPUT.fill(password);
    await this.SELECTORS.CREATE_PASSWORD_VIEW.CONFIRM_PASSWORD_IMPUT.fill(password);
    await this.SELECTORS.CREATE_PASSWORD_VIEW.ACCEPT_TERMS_CHECKBOX.click();
    await this.SELECTORS.CREATE_PASSWORD_VIEW.IMPORT_MY_WALLET_BUTTON.click();

    await this.SELECTORS.WALLET_CREATION_SUCCESSFUL_VIEW.GOT_IT_BUTTON.click();

    await this.SELECTORS.INSTALL_COMPLETE_VIEW.NEXT_BUTTON.click();
    await this.SELECTORS.INSTALL_COMPLETE_VIEW.DONE_BUTTON.click();

    await this.SELECTORS.WHATS_NEW.CLOSE_BUTTON.click();
  }
}
