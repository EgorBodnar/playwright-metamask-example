# Automation QA Framework Demo. 
#### Playwright interacting wit Metamask Chrome extension

The concept of a Framework as a black box for CI/CD systems is applied here. As a result, it can be integrated as a submodule to the main project or as a repository in a MonoRepo. Tests can then be executed through an isolated environment, which is already preconfigured in the Dockerfile.

## Table of Contents
- [Architecture](#architecture)
- [Installation](#installation)
- [Running Tests](#run-test)
- [Project Structure](#project-structure)

<a name="architecture"></a>
### <p style="text-align: center;">Test Adaptation Layer</p>

| REST API | WEB UI functional testing | WEB UI Layout Testing | WEB Testing Platform                                                                                                                                                                      | TMS integration                                                              | Metamask interaction                                                                                                                                                         | Design Patterns For Tests                                                                       |
|----------|---------------------------|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| TBD      | Playwright                | pixelmatch            | isolated in docker image. Framework - black box principle for CI/CD. <br/> All kinds of management through environment variables. Type of testing, functionality, and so on and so forth. | no TMS now, could be connected to any of TMS. Allure TestOps, TestRail, etc. | [ wrapped chrome extension ](doc/chrome-extention-interaction.md).<br/>It could be Synpress, but it wasn't used.<br/> >> [ See why ](doc/chrome-extention-interaction.md) << | Page Object <br/>Step Object<br/>Page Element<br/>Value Object <br/>Assert Object/Matchers<br/> |

### <p style="text-align: center;">Test Execution Layer</p>

| Runner                                                | Test Assertion                                                    | Test Reporting                              | Package manager |
|-------------------------------------------------------|-------------------------------------------------------------------|---------------------------------------------|-----------------|
| Playwright Test Runner <br/> TBD runner for API tests | Playwright built-in asserts<br/> TBD Jest/Chai based to API tests | Playwright HTML report<br/>Allure Framework | Yarn            |



<a name="installation"></a>
### Installation

Follow these steps to set up the project:

1.  **Install Node.js**: To run this project, you'll need to have Node.js installed on your system. You can download the latest version of Node.js from the official website: [https://nodejs.org/](https://nodejs.org/). Follow the installation instructions for your operating system.

2.  **Install Yarn**: Yarn is a package manager for Node.js that we'll use to manage the project's dependencies. You can install Yarn by following the instructions on the official website: [https://yarnpkg.com/](https://yarnpkg.com/).

3.  Create a copy of the `.env.example` file and rename it to `.env`. This new file will store the actual values for the environment variables.
  
4. **Install dependencies**
```bash
yarn install
```

<a name="run-test"></a>
### Running Tests

To run the tests, execute the following command:

```bash
yarn e2e:test
```

The report will be automatically generated after the automated tests have been executed.

**If you want to run the tests in Docker, simply build the image and run it. The framework will return an error code 1 if there were any test failures. This makes it easy to indicate the success or failure status of the test run. By using extensions in the input scripts, you can run various types of testing while controlling them through environment variables.**

<a name="project-structure"></a>
### Project Structure

```

├─ .git/
├─ node_modules/
├─ doc/                 -- Here are some concise arguments for the decision-making process in this project.
├─ fixtures/            -- Fixtures are essential for extending the standard capabilities of Playwright. They help set up and tear down the required resources or context before and after the execution of each test
├─ interfaces/          -- Interfaces are used for standardization and type enforcement of class methods. 
├─ testData/            -- Test data is currently in the form of objects, but it can be refactored into a more suitable format that better meets the project's needs. 
│ └─ extensions/        -- chrome extentions
├─ tests/
│  ├─ ui/
│  │  ├─ e2e/           -- e2e ui tests
│  │  └── pages/         -- PO based wrapped pages with stabdart API to use in tests
│  │     └─ components/ -- Components can be connected to pages like building blocks, extending their functionality. This approach eliminates code duplication and improves the maintainability of the tests.
│  └─
├─ playwright.config.ts -- Playwright config file
├─ .env                 -- requared env variables
...
...
└─ README.md
```
