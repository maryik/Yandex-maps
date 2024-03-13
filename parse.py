import requests
import json
import os
from bs4 import BeautifulSoup

# #                    !!!URL!!!
# url="https://burger-king.by/novinki-i-aktsii/"
# #                    !!!URL!!!

# headers = {
#     'Accept':'*/*',
#     'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36'
# }
current_dir = os.getcwd()
file_path = os.path.join(current_dir, "bk.json")
# req=requests.get(url, headers = headers)
# src = soup.prettify()
# src=req.text
# soup=BeautifulSoup(req.text,'lxml')

# bk_info=[]
# all_produkts_href=soup.find_all(class_="sc-1wehd2y-7 eyJjGh")
# for item in all_produkts_href:
#     item_href=item.find('a').get('href')
#     item_value=item.find('a').text
#     item_value2=item.find('p').text
#     bk_info.append({
#     "Href":"https://burger-king.by"+ item_href,
#     "Zagolovok":item_value,
#     "Pod_zagolovok":item_value2})
#     print(f"{item_value}:   " +"https://burger-king.by"+f"{item_href}\n",f"{item_value2}")
# with open(file_path,"a",encoding="utf-8") as file:
#     json.dump(bk_info,file,indent=4,ensure_ascii=False)

def get_json():
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)
    

