import pandas as pd

def main() -> None:
    portfolio = pd.read_csv("/home/pi/mymirror_v1/portfolioHistory.csv")
    portfolio = portfolio.sort_values(by=["year",
                                        "month",
                                        "day",
                                        "hour",
                                        "minute"])
    portfolio = portfolio.drop(["hour", "minute"], axis=1).drop_duplicates(keep="last")
    portfolio["date"] = pd.to_datetime(portfolio[["year", "month", "day"]])
    portfolio = portfolio.drop(["year", "month", "day"], axis=1)
    portfolio = portfolio.pivot(index="date",
                        columns="institution",
                        values="value")
    portfolio = portfolio.fillna(method="ffill")
    portfolio["total"] = portfolio.sum(axis=1).apply(lambda x: round(x))
    portfolio.to_csv("/home/pi/mymirror_v1/portfolio.csv")

if __name__ == "__main__":
    main()
