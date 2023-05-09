For interacting with the MetaMask extension, there is a solution called `Synpress`. This plugin allows you to communicate with MetaMask effectively. At present, this solution is the most popular and comparatively supported option for both Cypress and Playwright.

#### Advantages:

No need to worry about MetaMask interaction, as the API for working with it is ready-to-use.
#### Disadvantages:

The plugin hides MetaMask's functionality from the user and only allows access to predefined steps. Any additional checks are impossible.
Many unnecessary dependencies. Since this plugin was primarily developed for Cypress, it includes many Cypress dependencies that are not used in Playwright. However, because Cypress does not support working with multiple tabs/pages, Playwright is often used for this purpose. Therefore, this plugin for Cypress utilizes Playwright.
Limited support. Releases occur every 2-3 months, and there are only a few thousand downloads from npmjs per week. This situation raises the risk of encountering dependency hell.


### The solution I provided in this framework has several advantages:

* Full access to the plugin. Everything is possible, including control over every element, up to intercepting and modifying backend responses.
* Good scalability. With this approach, it is possible to connect any existing hot wallet extensions for Chromium browsers.
* Convenience and adherence to code style. The API of wrapped plugins will not differ from the API used for interaction with pages as defined in the framework.