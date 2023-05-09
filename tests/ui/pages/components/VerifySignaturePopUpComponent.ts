import {Page} from "@playwright/test";

export class VerifySignaturePopUpComponent {
    constructor(public page: Page) {}

    public VERIFY_SIGNATURE_POPUP = {
        FRAME: this.page.locator('.Toastify > div'),
        STATUS_TEXT: this.page.locator('.Toastify  .Toastify__toast-body div:nth-child(2)')
    }
}
