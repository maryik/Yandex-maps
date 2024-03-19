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
    [53.91302194300661, 27.433354844712564],
    [53.90701690644392, 27.445344681152104],
    [53.901569815420075, 27.446143709547187],
    [53.90970656594536, 27.47650679018281],
    [53.910792527961604, 27.499325411387037],
    [53.8787450300593, 27.507596294236624],
    [53.86164010318458, 27.472783992756398],
    [53.84983362486489, 27.48003655556478],
    [53.8744694539538, 27.529063884571844],
    [53.872930139553084, 27.587954695658162],
    [53.84227949166672, 27.578412028564422],
    [53.87714056784732, 27.647535409465092],
    [53.85275991743319, 27.707291598833933],
    [53.90550327492703, 27.561615693216535],
    [53.92490825938301, 27.577443008238554],
    [53.932895926689845, 27.597146403296726],
    [53.93232542975374, 27.610389666886576],
    [53.935980549096946, 27.664496066150758],
    [53.94715910409868, 27.691212845907792],
    [53.96534153778241, 27.63681361965552],
]
coordinates_kfc=[
    [ 53.90793739950191, 27.42386005254886],
    [53.92112534176144, 27.433845103308773],
    [53.94392708585796, 27.450789431871055],
    [53.90971979725151, 27.490729634910714],
    [53.89510189021196, 27.520382209894695],
    [53.870311069981504, 27.48044200685504],
    [53.90459607188874, 27.527866368415648],
    [53.89732401934127, 27.550206488177928],
    [53.89361478513345, 27.555513809398384],
    [53.90059659963753, 27.563166226041837],
    [53.90655930909832, 27.55477325294902],
    [53.909540344682966, 27.552057879301344],
    [53.87587955644636, 27.558705360715216],
    [53.86466766819348, 27.58596104353299],
    [53.921816882484926, 27.589764162065702]
]
coordinates_bk = [
    [53.914980917413345, 27.41204738166446],
    [53.91032978300483, 27.445349686651298],
    [53.91316096998865, 27.511954296624975],
    [53.87978120831089, 27.507491102701234],
    [53.851640591714855, 27.484488479669086],
    [53.93095260757765, 27.520537366532633],
    [53.90978419906246, 27.553414245199153],
    [53.905403345155015, 27.558509731141907],
    [53.89363766768123, 27.556443993597547],
    [53.89185224091834, 27.543223273313647],
    [53.87367041300921, 27.58453644065561],
    [53.92362452843093, 27.555498388345626],
    [53.91889137954778, 27.59594424626986],
    [53.92698321178057, 27.60372229587067],
    [53.931410154202936, 27.586092050108828],
    [53.93659976462271, 27.66776157468629],
    [53.949723545561156, 27.689540115886633],
    [53.96650375998345, 27.64935352463144],
    [53.85180825702277, 27.709072679389013]
]
coordinates_dominos=[
    [53.91327988070233, 27.415365480904367],
    [53.90878027665909, 27.437749135322417],
    [53.88606557555872, 27.45000685083706],
    [53.92321914786711, 27.506676579531543],
    [53.93848962014955, 27.486602349775673],
    [53.8645956422753, 27.441835040208282],
    [53.860090794380795, 27.47558816988629],
    [53.87590800503689, 27.50543304244369],
    [53.848589190047456, 27.54072610313623],
    [53.878802048447156, 27.550862241767412],
    [53.906930369912025, 27.552889470133785],
    [53.93547637836166, 27.55688385414514],
    [53.93007474817604, 27.588715457201186],
    [53.87723422364904, 27.602197079739867],
    [53.86622040890705, 27.60863491958984],
    [53.837875151581045, 27.607231208103855],
    [53.89131065884839, 27.69642308846445],
    [53.93887020803452, 27.653116614923682],
    [53.951879860285665, 27.688754233774937],
    [53.958515874797804, 27.628305614457613]
]
coordinates_cofix=[
    [53.93070198093787, 27.433448600698696],
    [53.911119753967185, 27.432403555365916],
    [53.907683341685214, 27.435219713460473],
    [53.90805644962874, 27.43894075150013],
    [53.90740350846344, 27.45453744413094],
    [53.92910230532739, 27.436769510431365],
    [53.91008642068873, 27.495584896744287],
    [53.91061236005569, 27.494171202272664],
    [53.93853320863767, 27.4901273624772],
    [53.93621181300811, 27.49503809064178],
    [53.85993351704802, 27.48280248270007],
    [53.87470423430646, 27.49994844024213],
    [53.88802764476334, 27.540380622308653],
    [53.89082730966725, 27.55896411087699],
    [53.89225052241249, 27.551811010428306],
    [53.89401376608911, 27.551379711988897],
    [53.902888300618145, 27.548969637857937],
    [53.90280064405412, 27.547890959548802],
    [53.88063553289557, 27.62658539975119],
    [53.920233408349546, 27.588578519710005],
    [53.93442488415119, 27.592750006543795],
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
print(all_kupons)
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
    "Koords":coordinates_dodo})

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
get_json()
