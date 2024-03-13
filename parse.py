from selenium import webdriver
import time
import requests
from fake_useragent import UserAgent
import os
import json
from bs4 import BeautifulSoup
url_dodo = "https://dodopizza.by/minsk/bonusactions"
url_kfc = "https://www.kfc.by/menu#coupons"
url_bk="https://burger-king.by/novinki-i-aktsii/"

                                    # !!!Координаты!!!
coordinates_dodo= [
    [53.910560898371564, 27.498649869207878],
    [53.90277418761867, 27.547487531143158]
]
coordinates_kfc=[
    [53.90509671516378, 27.540706894192997],
    [53.91975797971156, 27.49856402594152]    
]
coordinates_bk = [
    [53.91713280502105, 27.5873953693163],
    [53.90478711443015, 27.553731144620254],
    [53.908680463666805, 27.548838795322062],
]
                                    # !!!Координаты!!!

current_dir = os.getcwd()
# !!!Файлы!!!
file_path_dodo = os.path.join(current_dir,"dodo.json")
file_path_kfc = os.path.join(current_dir,"kfc.json")
file_path_bk = os.path.join(current_dir,"bk.json")
file_pathes= [file_path_dodo, file_path_kfc, file_path_bk]
# !!!Файлы!!!

useragent=UserAgent()
options=webdriver.ChromeOptions()
options.add_argument(f"use-agent={useragent.random}")
driver = webdriver.Chrome(options=options)
try:
    driver.get(url=url_dodo)
    time.sleep(2)
    with open("DODO.html","w") as file:
        file.write(driver.page_source)

    driver.get(url=url_kfc)
    time.sleep(2)
    with open("KFC.html","w") as file:
        file.write(driver.page_source)


    driver.get(url=url_bk)
    time.sleep(2)
    with open("BK.html","w") as file:
        file.write(driver.page_source)
except Exception as e:
    print(e)
finally:
    driver.close()
    driver.quit()

with open("DODO.html") as file:
    src=file.read()
soup_dodo=BeautifulSoup(src,"lxml")

with open("KFC.html") as file:
    src=file.read()
soup_kfc=BeautifulSoup(src,"lxml")

with open("BK.html") as file:
    src=file.read()
soup_bk=BeautifulSoup(src,"lxml")

all_kupons=soup_dodo.find_all(class_="sc-1f0lbpq-1 fkKTv")
dodo_info=[]
for item in all_kupons:
    aktsia_text=item.find('h1').text
    podaktsia_text=item.find('div',class_='description').text
    dodo_info.append({
    "Href":"https://dodopizza.by/minsk/bonusactions",
    "Zagolovok":aktsia_text,
    "Pod_zagolovok":podaktsia_text,
    "Koords":coordinates_dodo})

with open(file_path_dodo,"a",encoding="utf-8") as file:
    json.dump(dodo_info,file,indent=4,ensure_ascii=False)


all_kupons=soup_kfc.find_all(class_="product-list tiles")
last_znach=all_kupons[-1]
last_znach=last_znach.find_all(class_="row mt-4 product-row product")
kfc_info=[]
for item in last_znach:
    numbers_kupon=item.find('h3').text
    kupons_text=item.find('em').text
    kfc_info.append({
    "Href":"https://www.kfc.by/menu#coupons",
    "Zagolovok":numbers_kupon,
    "Pod_zagolovok":kupons_text,
    "Koords":coordinates_dodo})

with open(file_path_kfc,"a",encoding="utf-8") as file:
    json.dump(kfc_info,file,indent=4,ensure_ascii=False)


bk_info=[]
all_produkts_href=soup_bk.find_all(class_="sc-1wehd2y-7 eyJjGh")
for item in all_produkts_href:
    item_href=item.find('a').get('href')
    item_value=item.find('a').text
    item_value2=item.find('p').text
    bk_info.append({
    "Href":item_href,
    "Zagolovok":item_value,
    "Pod_zagolovok":item_value2,
    "Koords":coordinates_bk})

with open(file_path_bk,"a",encoding="utf-8") as file:
    json.dump(bk_info,file,indent=4,ensure_ascii=False)
files=[]
def get_json():
    for items in file_pathes:
        with open(item, "r", encoding="utf-8") as file:
            files.append(json.load(file))
    return files