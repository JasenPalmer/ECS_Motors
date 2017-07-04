# ECS Motors
https://ecsmotors.herokuapp.com/

## Dependencies

Node (should be on lab machines) but [click here for other machines](https://nodejs.org/en/download/package-manager/)

Heroku CLI (should be on lab machines) but [click here for other machines](https://devcenter.heroku.com/articles/heroku-cli)


## To Run locally

To run locally lab machines (cause thats what i curently have and havent tried anywhere ele)
- Clone/Download the repo and navigate into ECS_Motors directory
- run `npm install` to install dependences
- run `node app.js` to start server
- navigate to localhost:8080 in your browser to start browsing the site :)


## Deploying to Heroku
this is how to manually deploy via th CLI but it should be set up to push all commits in master to live. so always keep master working plz!!!

- ensure you are logged into the Heroku CLI (`heroku login` and enter your details)
- ensure you ahve heroku as a remote (check with `git remote -v`)
  - add heroku as a remote with `heroku git:remote -a ecsmotors`
- double check the latest commit on master and esnure its good to go live!
- push to live with `git push heroku master`
- check logs at https://dashboard.heroku.com/apps/ecsmotors/logs and ensure its all a-ok
