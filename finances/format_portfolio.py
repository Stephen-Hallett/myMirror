import pandas as pd
import sys
import os

def main() -> None:
    if sys.platform == "darwin":
        path = "/Users/stephen/myMirror"
    else:
        path = "/home/pi/mymirror_v1"
    portfolio = pd.read_csv(os.path.join(path, "portfolioHistory.csv"))
    portfolio = portfolio.sort_values(by=["year",
                                        "month",
                                        "day",
                                        "hour",
                                        "minute"])
    portfolio = portfolio.drop(["hour", "minute"], axis=1)
    portfolio["date"] = pd.to_datetime(portfolio[["year", "month", "day"]])
    portfolio = portfolio.drop(["year", "month", "day"], axis=1)
    portfolio = portfolio.drop_duplicates(subset=["date", "institution"], keep="last")
    portfolio = portfolio.pivot(index="date",
                        columns="institution",
                        values="value")
    portfolio = portfolio.fillna(method="ffill")
    portfolio["total"] = portfolio.sum(axis=1).apply(lambda x: round(x))
    print(portfolio)
    portfolio.to_csv(os.path.join(path, "portfolio.csv"))

if __name__ == "__main__":
    main()
