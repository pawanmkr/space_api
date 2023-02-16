import chalk from "chalk";

const handleError = (error, where) => {
    //res.status(httpStatusCode)
    console.log(chalk.bgRed.white.bold(where));
    console.log(error);
}

export default handleError;

// modiyfy this further to accept status code also
// handleError(error, msg, httpStatusCode)