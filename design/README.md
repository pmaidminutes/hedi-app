# Getting started
* run `yarn install` in root directory to install dependancies
* run `make prepare-design` in root to build the project and copy files (alternative run just the commands from the Makefile seperate if make is not available)
* run `yarn design` to start the app in design mode

The app will use data from the build json files, whenever possible. 

# Getting started with gulp for scss 
* go into folder design/scss
* run `yarn install` to install dependancies
* run `yarn gulp` to start the gulp watcher

The gulp watcher will build a new css file everytime, somethings changes in a scss file.

# Workflows
## Changing style of a component
* checkout a new branch `git checkout -b <name of the feature to change>`
* make small commits and name them by the branch name. For example if the branch name is `article-style` a commit should be something like this `[article-style] add className to the comonent`
* push your work steady
* when finished, ad a pullrequest 
### scss wise
* add a new scss file for the component to change
* import the file in the component.scss