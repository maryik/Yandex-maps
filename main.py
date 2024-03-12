from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse

from parse import get_json
templates = Jinja2Templates(directory=".")
root=FastAPI()
root.mount('/static', StaticFiles(directory="static"), name = 'static')

@root.get('/home', response_class=HTMLResponse)
async def check_cookie(request: Request):
    data = get_json()
    return templates.TemplateResponse("index.html", context={"request": request, "json": data})

@root.get('/sales', response_class=JSONResponse)
async def check_cookies(request: Request):
    data = get_json()
    return { "json": data}

@root.get('/profile', response_class=HTMLResponse)
async def check_cookie(request: Request):
    return templates.TemplateResponse("profile.html", {"request": request})

if __name__ == '__main__':
    uvicorn.run('main:root', host='localhost', port=8001, reload=True)