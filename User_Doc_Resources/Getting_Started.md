# Getting Started
## Cloning the app
* In the GitHub repo click the Code button. 
* A drop down will appear where you can copy the code URL.
* In a terminal cd into the folder you want to put the code.
* run `git clone <above URL>`
## Configure the app
In your terminal run:
* `cd SeniorDesign/marv`
* `npm install`
  * Installs netlify-cli and react
  * Can install individually with: `npm i -g netlify-cli` and `npm i react`
* `set NODE_OPTIONS=--openssl-legacy-provider`

## Setting up Twitter and Google Developer accounts
### Google
* Go to the following site and follow directions to make a google account a developer account
* [Google Developer Account](https://console.cloud.google.com/welcome)
* Make not of the Bearer Token once account is created

### Twitter
* Create a twitter account if you do not already have one
* Go to the following site and follow directions to make a twitter account a developer account
* [Twitter Developer Account](https://developer.twitter.com/en/docs/platform-overview)
* Make not of the Bearer Token once account is created

## Adding Keys
* Open cloned code in an editor (Visual Studio Code Recommended)
* Go to marv/functions/TwitterFetch.js
* Add Twitter Bearer Token where it says *** ADD BEARER TOKEN ***
## Start the app
In your terminal run
* `cd SeniorDesign/marv` (if not already in folder)
* `netlify dev`
## Helpful resources
* [Clone React App](https://javascript.plainenglish.io/how-to-clone-an-app-from-github-446541a0302d)
* [Netlify](https://www.digitalocean.com/community/tutorials/nodejs-solve-cors-once-and-for-all-netlify-dev)
* [Twitter Developer Support](https://developer.twitter.com/en/support/twitter-api/developer-account#faq-team-accounts)