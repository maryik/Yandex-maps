from fastapi import FastAPI, Request
from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse

from parse import get_json
templates = Jinja2Templates(directory=".")
root=APIRouter()
test = FastAPI()
test.mount('/static', StaticFiles(directory="static"), name = 'static')


@root.get('/home', response_class=HTMLResponse)
async def check_cookie(request: Request):
    try:
        # data = get_json()
        return templates.TemplateResponse("index.html", context={"request": request})
    except Exception as e:
        print(f'{e}')


@root.get('/sales', response_class=JSONResponse)
async def check_cookies(request: Request):
    try:
        data = get_json()
        return {"json": data}
    except Exception as e:
        print(f'{e}')


@root.get('/profile', response_class=HTMLResponse)
async def check_cookie(request: Request):
    return templates.TemplateResponse("profile.html", {"request": request})

test.include_router(root)
if __name__ == '__main__':
    uvicorn.run('main:test', host='127.0.0.1', port=7050, reload=True)