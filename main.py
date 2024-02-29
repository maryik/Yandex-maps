import uvicorn
from fastapi import FastAPI, APIRouter

from api.pl_login import login_router

app = FastAPI(title='Menu app')

main_api_router = APIRouter()
main_api_router.include_router(login_router, prefix='/user', tags=['User operations'])
app.include_router(main_api_router)


if __name__ == '__main__':
    uvicorn.run('main:app', host='localhost', port=5000, reload=True)
