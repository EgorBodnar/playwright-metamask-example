import dotenv from "dotenv-safe";
import { test, expect } from "../../../fixtures/metaMaskFixtures";

import { SignatureVerifierPage } from "../pages/SignatureVerifierPage";
import { MetaMaskExtension } from "../MetaMaskExtension";
import { metaMaskWallet } from "../../../testData/metaMaskWallet";
dotenv.config();

test.describe("MetaMask wallet connection", () => {

  test("Sign massage by Metamask", async ({ page, context }) => {
    const signatureVerifierPage = new SignatureVerifierPage(context.pages()[0]);
    const metaMaskExtension = new MetaMaskExtension(context.pages()[1]);

    await signatureVerifierPage.navigateTo();
    await signatureVerifierPage.verifyRequiredElementsPresent();

    await metaMaskExtension.navigateTo();
    await metaMaskExtension.verifyRequiredElementsPresent();
    await metaMaskExtension.importWallet(metaMaskWallet.passphrase, metaMaskWallet.password);

    await signatureVerifierPage.SELECTORS.MAIN_HEADER.CONNECT_BUTTON.click();
    const newMetaMaskTab = new MetaMaskExtension(context.pages()[2]);
    await expect(newMetaMaskTab.SELECTORS.CONNECT_WITH_METAMASK_VIEW.TITLE).toBeVisible();
    await expect(newMetaMaskTab.SELECTORS.CONNECT_WITH_METAMASK_VIEW.SITE_TO_CONNECT).toContainText(process.env.FRONTEND_URL);

    await newMetaMaskTab.SELECTORS.CONNECT_WITH_METAMASK_VIEW.NEXT_BUTTON.click();
    await newMetaMaskTab.SELECTORS.CONNECT_TO_ACCOUNT_VIEW.CONNECT_BUTTON.click();

    await expect(signatureVerifierPage.SELECTORS.MAIN_HEADER.CONNECT_BUTTON).toContainText('Connected!');

    await signatureVerifierPage.SELECTORS.MESSAGE_INPUT.fill('TEST MESSAGE');
    await signatureVerifierPage.SELECTORS.WALLET_ADDRESS_INPUT.fill(metaMaskWallet.address);
    await signatureVerifierPage.SELECTORS.SIGN_MASSAGE_BUTTON.click();

    await expect(newMetaMaskTab.SELECTORS.SIGNATURE_REQUEST_VIEW.MESSAGE).toBeVisible();
    await expect(newMetaMaskTab.SELECTORS.SIGNATURE_REQUEST_VIEW.MESSAGE).toContainText('TEST MESSAGE');
    await newMetaMaskTab.SELECTORS.SIGNATURE_REQUEST_VIEW.SIGN_BUTTON.click();

    await expect(signatureVerifierPage.SELECTORS.SIGNATURE).toBeVisible();

    await signatureVerifierPage.SELECTORS.VERIFY_SIGNATURE_BUTTON.click();
    await expect(signatureVerifierPage.SELECTORS.VERIFY_SIGNATURE_POPUP.FRAME).toBeVisible();
    await expect(signatureVerifierPage.SELECTORS.VERIFY_SIGNATURE_POPUP.STATUS_TEXT).toContainText('Valid signature');
  });
});
