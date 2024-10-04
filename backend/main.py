from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from sqlalchemy.ext.asyncio import AsyncSession

from database.utils import *
from database.models import *

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],  # or '*' for all origins
    allow_credentials = True,
    allow_methods=["GET", "POST"],
    allow_headers=['*'],
)

