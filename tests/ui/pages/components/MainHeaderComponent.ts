import {Page} from "@playwright/test";

export class MainHeaderComponent {
    constructor(public page: Page) {}

    public MAIN_HEADER = {
        LOGO: this.page.locator('a.logo'),
        CONNECT_BUTTON: this.page.getByRole('button', { name: 'Connect' }),
    }
}
