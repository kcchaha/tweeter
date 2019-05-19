# Tweeter Project

Tweeter is a single-page Twitter clone.

This app allows users to compose tweets, like tweets and review all the tweets that were posted.
All the tweets and likes are saved in MongoDB.
Note: In this version, user login is not enabled and liking tweets can only increment. This will be fixed in the later versions.

Tweeter was built with front-end techniques such as HTML, CSS, JS, jQuery and AJAX, and also back-end techniques such as  Node, Express and MongoDB.

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Turn on your vagrant machine in your termianl (`vagrant up` -> `vagrant ssh`), all the following commands need to be invoked in your terminal.
3. Install dependencies using the `npm install` command.
4. Start the web server using the `npm run local` command. The app will be served at <http://localhost:3000/>.
5. Go to <http://localhost:3000/> in your browser.
6. In case the port has already been used, quit all your browsers and restart, do `npm start` again before you reopen your browser.

## Dependencies

- Express
- Node 5.10.x or above
- AJAX
- MongoDB
- Chance


## Final Product

!["Main page"](https://github.com/kcchaha/tweeter/blob/master/docs/main%20page.png)
!["Liked tweet"](https://github.com/kcchaha/tweeter/blob/master/docs/liked%20tweet.png)
!["Hovering effects and responsive design"](https://github.com/kcchaha/tweeter/blob/master/docs/hovering%20effect%20and%20responsive%20design.png)
!["Error - empty input"](https://github.com/kcchaha/tweeter/blob/master/docs/error%20no%20input.png)
!["Error -  Max input exceed"](https://github.com/kcchaha/tweeter/blob/master/docs/error%20max%20input%20exceed.png)
