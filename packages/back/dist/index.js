const app = require("./app");
const port = process.env.PORT || 5000;
/**
 * Start Express server.
 */
app.listen(port, (err) => {
    if (err) {
        console.error(`ERROR: ${err.message}`);
    }
    else {
        console.log(`Listening on port ${port}`);
    }
});
//# sourceMappingURL=index.js.map