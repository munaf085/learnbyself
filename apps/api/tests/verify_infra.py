import asyncio
import asyncpg
import redis
import httpx
from app.main import app

async def test_postgres():
    print("Testing PostgreSQL connection on localhost:5434...")
    conn = await asyncpg.connect("postgresql://postgres:postgres@localhost:5434/learnbyself")
    val = await conn.fetchval("SELECT version()")
    await conn.close()
    print(f"PostgreSQL connection SUCCESS: {val[:35]}...")

def test_redis():
    print("Testing Redis connection on localhost:6380...")
    r = redis.Redis(host="localhost", port=6380, db=0)
    res = r.ping()
    print(f"Redis PING response: {res} (SUCCESS)")

async def test_api_health():
    print("Testing FastAPI health endpoint via ASGI transport...")
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as client:
        res = await client.get("/api/v1/health")
        assert res.status_code == 200
        print(f"FastAPI health response: {res.json()} (SUCCESS)")

async def main():
    await test_postgres()
    test_redis()
    await test_api_health()
    print("ALL INFRASTRUCTURE & BACKEND CHECKS PASSED.")

if __name__ == "__main__":
    asyncio.run(main())
