import requests
from dotenv import load_dotenv
import os
from datetime import datetime
from urllib.parse import urlencode
import pandas as pd
import sys

def get_investnow(sms: str) -> float:
    url = "https://loginapi.adminis.co.nz/connect/token"

    payload = {
        'client_id':'in_client',
        'grant_type':'password',
        'managerId':'4542',
        'password':os.environ["INVESTNOW_PASSWORD"],
        'username':os.environ["EMAIL"],
        'passcode':sms
    }

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    response = requests.request("POST", url, headers=headers, data=urlencode(payload))
    login = response.json()
    token = login['access_token']

    url = "https://webapi.adminis.co.nz/api/portfolio/90652/trialBalance"
    headers = {
        'Authorization': f"Bearer {token}"
    }

    response = requests.request("GET", url, headers=headers)
    balance = response.json()
    investnow_value = balance["netAssetValue"]["value"]
    return investnow_value


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
        update_history("InvestNow", get_investnow, sms)
    except Exception as e:
        print(f"ERROR - COULDN'T UPDATE \"InvestNow\"")
        print(e)
         
if __name__ == "__main__":
   main()
