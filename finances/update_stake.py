import requests
from dotenv import load_dotenv
import os
from forex_python.converter import CurrencyRates
from datetime import datetime
import pandas as pd
import sys

def get_stake(sms: str) -> float:
    url = "https://global-prd-api.hellostake.com/api/sessions/v2/createSession"
    payload = {
            'username': os.environ["EMAIL"],
            'password': os.environ["STAKE_PASSWORD"],
            'platformType': "WEB_f5K2x3",
            'rememberMeDays': 1000,
            'otp': sms
        }
    headers = {
    'content-type': 'application/json;charset=UTF-8'
    }

    response = requests.request("POST", url, headers=headers, json=payload)
    login = response.json()

    url = "https://global-prd-api.hellostake.com/api/users/accounts/v2/equityPositions"
    headers = {
    'stake-session-token': login["sessionKey"]
    }
    response = requests.request("GET", url, headers=headers)
    cr = CurrencyRates().get_rate('USD', 'NZD', datetime.now())
    stake_value = response.json()["equityValue"] * cr
    return stake_value


def update_history(institution: str, func, *args) -> None:
    now = datetime.now()
    row =[
        now.year, 
        now.month, 
        now.day,
        now.hour,
        now.minute,
        institution,
        round(func(*args),2)
    ]
    if not os.path.exists("/home/pi/mymirror_v1/portfolioHistory.csv"):
        portfolio = pd.DataFrame(columns=["year", "month", "day", "hour", "minute", "institution", "value"])
    else:
        portfolio = pd.read_csv("/home/pi/mymirror_v1/portfolioHistory.csv")
    portfolio.loc[portfolio.shape[0]] = row
    portfolio.to_csv("/home/pi/mymirror_v1/portfolioHistory.csv", index=False)
   
def main() -> None:
    load_dotenv()

    try:
        sms = sys.argv[1]
        update_history("Stake", get_stake, sms)
    except Exception as e:
        print(f"ERROR - COULDN'T UPDATE \"Stake\"")
        print(e)
         
if __name__ == "__main__":
   main()
