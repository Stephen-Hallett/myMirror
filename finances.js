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
        const today_value = portfolio[portfolio.length - 1]["total"];
        const change = ((parseInt(today_value,10) / parseInt(portfolio[portfolio.length - 2]["total"],10)) - 1) * 100
        callback(undefined, {
            mostRecent: today_value,
            change: change.toFixed(1),
            portfolio: portfolio,
        });
    });
};

module.exports = {getPortfolio};