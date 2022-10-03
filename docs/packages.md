# Why did you use these packages?
(How did you choose the packages, why and how you decide to add /select a package.)

* **yargs + inquirer** - similar cli args parsers, but inquirer implements fancy interactive prompts. Choosing their combination allows having both modes of arguments reading: with and without prompts
* **boxen** - draws boxes with titles around content with support of styling and box nesting
* **dotenv** - reads environmental properties from .env files. Those contain API keys for runtime and integration tests
* **got** - request making library for nodejs. Was suggested by the task description. I prefer axios.
* **lodash** - convenient utilities. It has a ```lodash/template``` utility which I found necessary
* All other packages support building, testing and linting scripts