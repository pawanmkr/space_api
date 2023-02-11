import chalk from "chalk";

const handleError = (error, where) => {
    console.log(
        chalk.bgRed.white.bold(where)
    );
    console.log(error);
}

export default handleError;