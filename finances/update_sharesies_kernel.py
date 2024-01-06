import requests
from dotenv import load_dotenv
import os
import json
from datetime import datetime
import pandas as pd

def get_sharesies() -> float:
    url = "https://app.sharesies.nz/api/identity/login"

    payload = json.dumps({
        "email": os.environ["EMAIL"],
        "password": os.environ["SHARESIES_PASSWORD"],
        "remember": False,
        "mfa_token": ""
    })
    headers = {
    'content-type': 'application/json',
    }

    response = requests.request("POST", url, headers=headers, data=payload).json()

    #---------------------------------------------------------------------------------------------------------

    url = f"https://portfolio.sharesies.nz/api/v1/portfolios/{response['user']['portfolio_id']}"

    payload = {}
    headers = {
    'authorization': f'Bearer {response["rakaia_token"]}',
    }

    response = requests.request("GET", url, headers=headers, data=payload).json()

    sharesies_value = response['portfolio_value']
    #pprint(response) #Kind of unsure whether this includes wallet value since my wallet is empty... I hope it does, but I don't plan on increasing wallet value so should be okay...
    return sharesies_value

def get_kernel() -> float:    
    session = requests.Session()

    res = session.get("https://my.kernelwealth.co.nz/api/auth/csrf")
    csrf = res.json()["csrfToken"]

    url = "https://my.kernelwealth.co.nz/api/auth/callback/login?"

    payload = {
        'username': os.environ["EMAIL"],
        'password': os.environ["KERNEL_PASSWORD"],
        'csrfToken': csrf,
        'json': True
    }
    response = session.post(url, json=payload)

    url = "https://my.kernelwealth.co.nz/api/auth/session"
    response = session.get(url)
    token = response.json()['accessToken']

    url = "https://chelly.kernelwealth.co.nz/api/LandingPage"
    headers = {
        'authorization': f'Bearer {token}'
    }
    portfolio = session.get(url, headers=headers).json()
    kernel_value = portfolio["financialFreedomTotal"]/100
    return kernel_value


def update_history(institution: str, func) -> None:
    now = datetime.now()
    row =[
        now.year, 
        now.month, 
        now.day,
        now.hour,
        now.minute,
        institution,
        round(func(),2)
    ]
    if not os.path.exists("/home/pi/mymirror_v1/portfolioHistory.csv"):
        portfolio = pd.DataFrame(columns=["year", "month", "day", "hour", "minute", "institution", "value"])
    else:
        portfolio = pd.read_csv("/home/pi/mymirror_v1/portfolioHistory.csv")
    portfolio.loc[portfolio.shape[0]] = row
    portfolio.to_csv("/home/pi/mymirror_v1/portfolioHistory.csv", index=False)
    
   
def main() -> None:
    load_dotenv()

    institution_dict = {
      "Sharesies": get_sharesies,
      "Kernel Wealth":get_kernel,
    }
    for institution in institution_dict:
        try:
            update_history(institution, institution_dict[institution])
        except Exception as e:
            print(f"ERROR - COULDN'T UPDATE \"{institution}\"")
            print(e)
         
if __name__ == "__main__":
   main()
