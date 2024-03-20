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
url_dominos="https://dominos.by/ru/minsk/promo/"
url_cofix="https://cofix.global/ru-by/actions/minsk/"
# !!!Координаты!!!
coordinates_dodo= [
    [53.9640823986828, 27.624131816328322],
    [53.90259594783253, 27.54739865527979],
    [53.90867311277731, 27.432329995704528],
    [53.847431149363125, 27.47109140142055],
    [53.84014903120871, 27.568782334656444],
    [53.848986784483834, 27.69900940353395],
    [53.87643817311812, 27.495191521107547],
    [53.8745049799703, 27.633221625773235],
]
coordinates_kfc=[
    [53.94628562545585, 27.688335298411765],
    [53.919463891998866, 27.49852240713618],
    [53.86352646093882, 27.571738262444867],
    [53.89192812022155, 27.551086850572126],
    [53.90615645427178, 27.528098003431673],
    [53.9218710320103, 27.597917562031213],
    [53.87514976973033, 27.595137572954318],
    [53.89195958777573, 27.527927690507735],
]
coordinates_bk = [
    [53.91713576013801, 27.587379988049182],
    [53.84751583794851, 27.471003830527327],
    [53.9112395730459, 27.414460457458105],
    [53.93386381257909, 27.653186411058996],
    [53.92881874218789, 27.587066942229683],
    [53.859795157680644, 27.67388535373398],
    [53.90930705166665, 27.496374104481983],
    [53.908654534582695, 27.54871911363847],
    [53.8765421128702, 27.49517262998955]
]
coordinates_dominos=[
    [53.93802020388006, 27.487866405113447],
    [53.905432967383426, 27.551511776266675],
    [53.88408388164922, 27.684694764247144],
    [53.864603327927874, 27.60339529144316],
    [53.875550567636594, 27.497099508549738],
    [53.862883328659805, 27.44194607891112],
    [53.93264309099595, 27.555689553685756],
    [53.87817995898024, 27.54821876501742]
]
coordinates_cofix=[
    [53.90651381856817, 27.454355356624436],
    [53.917808762432855, 27.588933835425532],
    [53.890350016208224, 27.555982750379993],
    [53.859560393828346, 27.481930042827955],
    [53.87612767615525, 27.627730243687846],
    [53.9097225440726, 27.57886319296851],
]
                                    # !!!Координаты!!!

current_dir = os.getcwd()
# !!!Файлы!!!
file_path_dodo = os.path.join(current_dir,"dodo.json")
file_path_kfc = os.path.join(current_dir,"kfc.json")
file_path_bk = os.path.join(current_dir,"bk.json")
file_path_dominos = os.path.join(current_dir,"dominos.json")
file_path_cofix= os.path.join(current_dir,"cofix.json")
file_pathes = [file_path_dodo, file_path_kfc, file_path_bk, file_path_dominos,file_path_cofix]
# !!!Файлы!!!

# useragent=UserAgent()
# options=webdriver.FirefoxOptions()
# options.add_argument(f"use-agent={useragent.random}")
# driver = webdriver.Firefox(options=options)
# try:
#     driver.get(url=url_dodo)
#     time.sleep(5)
#     with open("DODO.html","w",encoding="utf-8") as file:
#         file.write(driver.page_source)

#     driver.get(url=url_kfc)
#     time.sleep(2)
#     with open("KFC.html","w",encoding="utf-8") as file:
#         file.write(driver.page_source)

#     driver.get(url=url_bk)
#     time.sleep(2)
#     with open("BK.html","w",encoding="utf-8") as file:
#         file.write(driver.page_source)

#     driver.get(url=url_dominos)
#     time.sleep(2)
#     with open("DOMINOS.html","w",encoding="utf-8") as file:
#         file.write(driver.page_source)

#     driver.get(url=url_cofix)
#     time.sleep(2)
#     with open("COFIX.html","w",encoding="utf-8") as file:
#         file.write(driver.page_source)

# except Exception as e:
#     print(e)
# finally:
#     driver.close()
#     driver.quit()

with open("DODO.html",encoding="utf-8") as file:
    src=file.read()
soup_dodo=BeautifulSoup(src,"lxml")

with open("KFC.html", 'r', encoding="utf-8") as file:
    src=file.read()
soup_kfc=BeautifulSoup(src,"lxml")

with open("BK.html",encoding="utf-8") as file:
    src=file.read()
soup_bk=BeautifulSoup(src,"lxml")

with open("DOMINOS.html",encoding="utf-8") as file:
    src=file.read()
soup_dominos=BeautifulSoup(src,"lxml")

with open("COFIX.html",encoding="utf-8") as file:
    src=file.read()
soup_cofix=BeautifulSoup(src,"lxml")

all_kupons=soup_dodo.find_all(class_="sc-wlfkge-1 gQhlLr")
dodo_info=[]
for item in all_kupons:
    aktsia_text=item.find('h1').text
    podaktsia_text=item.find('div',class_='description').text
    dodo_info.append({
    "name":"DODO",
    "Href":"https://dodopizza.by/minsk/bonusactions",
    "Zagolovok":aktsia_text,
    "Pod_zagolovok":podaktsia_text,
    "Koords":coordinates_dodo})

with open(file_path_dodo,"w",encoding="utf-8") as file:
    json.dump(dodo_info,file,indent=4,ensure_ascii=False)


all_kupons=soup_kfc.find_all(class_="product-list")
last_znach=all_kupons[-1]
last_znach=last_znach.find_all(class_="row mt-4 product-row product")
kfc_info=[]
for item in last_znach:
    numbers_kupon=item.find('h3').text
    kupons_text=item.find('em').text
    kfc_info.append({
    "name":"KFC",
    "Href":"https://www.kfc.by/menu#coupons",
    "Zagolovok":numbers_kupon,
    "Pod_zagolovok":kupons_text,
    "Koords":coordinates_kfc})

with open(file_path_kfc,"w",encoding="utf-8") as file:
    json.dump(kfc_info,file,indent=4,ensure_ascii=False)


bk_info=[]
all_produkts_href=soup_bk.find_all(class_="sc-1wehd2y-7 eyJjGh")
for item in all_produkts_href:
    item_href=item.find('a').get('href')
    item_value=item.find('a').text
    item_value2=item.find('p').text
    bk_info.append({
    "name":"BURGER KING",
    "Href":"https://burger-king.by/"+item_href,
    "Zagolovok":item_value,
    "Pod_zagolovok":item_value2,
    "Koords":coordinates_bk})

with open(file_path_bk,"w",encoding="utf-8") as file:
    json.dump(bk_info,file,indent=4,ensure_ascii=False)
all_kupons=soup_dominos.find_all(class_="promo-card")
dominos_info=[]
for item in all_kupons:
    item_href=item.find('a').get('href')
    aktsia_text=item.find('div',class_="card-title").text
    podaktsia_text=item.find(class_='card-text').find('p').find_next().text+" "+item.find(class_='card-text').find('p').find_next().find_next().text
    dominos_info.append({
    "name":"DOMINOS",
    "Href":item_href,
    "Zagolovok":aktsia_text,
    "Pod_zagolovok":podaktsia_text,
    "Koords":coordinates_dominos})

with open(file_path_dominos,"w",encoding="utf-8") as file:
    json.dump(dominos_info,file,indent=4,ensure_ascii=False)

# !!!!!
all_kupons=soup_cofix.find_all('div',class_="action-item__col")
all_kupons=all_kupons[1:]
cofix_info=[]
for item in all_kupons:
    aktsia_text=item.find('div',class_="action-item__description").text
    podaktsia_text=item.find('div',class_="action-item__link").text
    cofix_info.append({
    "name":"COFIX",
    "Href":"https://cofix.global/ru-by/actions/minsk/",
    "Zagolovok":aktsia_text,
    "Pod_zagolovok":podaktsia_text,
    "Koords":coordinates_cofix})

with open(file_path_cofix,"w",encoding="utf-8") as file:
    json.dump(cofix_info,file,indent=4,ensure_ascii=False)

def get_json():
    all_data = []
    for file_path in file_pathes:
        with open(file_path, "r", encoding="utf-8") as file:
            temp=[]
            data = json.load(file)
            temp.append(data)
            all_data.append(temp)
    return all_data
