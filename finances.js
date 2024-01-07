const fs = require("fs");
const csv = require("csv-parser");

const getPortfolio = (callback) => {
    const portfolio = [];

    fs.createReadStream("portfolio.csv")
    .pipe(csv())
    .on("data", (data) => {
        const { date, total } = data;
        const newRow = { date, total };
        portfolio.push(newRow);
    })
    .on("end", () => {
        const today_value = portfolio[portfolio.length - 1];
        console.log(portfolio);
        callback(undefined, {
            mostRecent: today_value,
            portfolio: portfolio,
        });
    });
};

