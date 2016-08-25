lighten
=======================
The lighten UI.

Getting started
---------------

1. Ensure you have node v6+ installed. With homebrew: `brew install node`. Or even better use [nvm](https://github.com/creationix/nvm)!
1. Clone this directory (choose your favorite protocol)

  ```
  git clone git@github.com:sfbrigade/lighten-ui.git
  git clone https://github.com/sfbrigade/lighten-ui.git
  ```
1. `cd lighten-ui`
1. Run `npm install`.
1. Run `npm run dev:no-debug`.
1. In another terminal, run `npm run lint:watch`. That will lint the project and tell you if you are breaking our linting rules.
1. Open `http://localhost:3000` in your browser.

Commands
-------------------------------------

```bash
npm run build            # creates a production bundle
npm run lint             # run eslint
npm run lint:fix         # attempt to fix lint errors
npm run lint:watch       # run lint continuously
npm start                # run locally
npm run dev:debug-window # run locally with redux devtools in separate window
npm run dev:no-debug     # run locally with redux devtools disabled
npm test                 # run the tests once
npm run tdd              # run the tests continually (TDD mode)
```

Build the UI
-------------------------------------------

Simple run the `build.sh` script at the project root.
```bash
./build.sh
```

You can then see the changes to the UI locally in docker, and when you are ready to push to production, just `git push`!

Using the Redux devtools
-------------------------------------

After a successful `npm start`, you have probably noticed the devtools sliding panel hovering over your app. There are several different ways of presenting these devtools:

- Use them as-is if they are not bothering you.
- Open them in a new window with `npm run dev:debug-window`.
  - Note: You will need to enable pop-ups at `localhost:3000` in your browser for this to work. There will be a nasty angry red error until you enable pop-ups.
- Install the [browser extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) (the panel will hide automatically when you have it installed).
- Or just turn off the devtools with `npm run dev:no-debug`.
