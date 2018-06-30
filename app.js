const proxy = require('express-http-proxy');
const express = require("express");
const app = express();
const router = express.Router();

// Allow environment variables to be access through process.env
require('dotenv').config();

let rootStaticPath;
if (process.env.NODE_ENV === "development") {
    rootStaticPath = "app"
} else {
    rootStaticPath = "public"
}
app.use("/documents", express.static(`${rootStaticPath}/documents`));
app.use("/css", express.static(`${rootStaticPath}/css`));
app.use("/js", express.static(`${rootStaticPath}/js`));
app.use("/img", express.static(`${rootStaticPath}/img`));
app.use("/fonts", express.static(`${rootStaticPath}/fonts`));
app.use("/public", express.static(`${rootStaticPath}`));

app.use("/.netlify/functions", proxy("http://localhost:9000"));

app.set("views");
app.set("view engine", "pug");

app.use(router);

// Make sure all URLs use www.
router.all(/.*/, function(request, response, next) {
    const host = request.get("host");
    if (host === "robertcooper.me") {
        if (host.match(/^www\..*/i)) {
            next()
        } else {
            response.redirect(301, "https://www." + host)
        }
    }
    next()
});

router.get("/", (request, response) => {
    response.render("index", { environment: process.env.NODE_ENV })
});

// router.get("/.netlify/functions/getTwitterData", (request, response) => {
//     // response.send(JSON.stringify('sup'));
//     fetch('http://localhost:9000/getTwitterData').then((result) => response.send(JSON.stringify('sup')))
//     // getTwitterData()
//     //     .then(getTwitterData => {
//     //         response.json(getTwitterData)
//     //     })
//     //     .catch(error => {
//     //         response.send(error)
//     //     })
// });

router.get("/.netlify/functions/getGoodreadsData", (request, response) => {
    // getGoodreadsData()
    //     .then(goodreadsData => {
    //         response.json(goodreadsData)
    //     })
    //     .catch(error => {
    //         response.send(error)
    //     })
});

router.get("/.netlify/functions/getGithubData", (request, response) => {
    // getGithubData()
    //     .then(githubData => {
    //         response.json(githubData)
    //     })
    //     .catch(error => {
    //         response.send(error)
    //     })
});

router.get("/.netlify/functions/getStravaData", (request, response) => {
    // getStravaData()
    //     .then(stravaData => {
    //         response.json(stravaData)
    //     })
    //     .catch(error => {
    //         response.send(error)
    //     })
});

router.get("/.netlify/functions/getMediumData", (request, response) => {
    // getMediumData()
    //     .then(mediumData => {
    //         response.json(mediumData)
    //     })
    //     .catch(error => {
    //         response.send(error)
    //     })
});

app.use((request, response, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((error, request, response) => {
    response.status(error.status);
    console.error(error.stack);
    response.send(error.stack);
});

app.listen(8080, () => {
    process.env.NODE_ENV === "development"
        ? console.log("The application is running on localhost:8080!")
        : console.log("The application is running at www.robertcooper.me!")
});
