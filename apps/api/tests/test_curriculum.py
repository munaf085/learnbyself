import pytest
from httpx import ASGITransport, AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_curriculum_endpoints():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # 1. Languages Manifest
        res = await ac.get("/api/v1/curriculum/languages")
        assert res.status_code == 200
        manifest = res.json()
        assert "languages" in manifest
        java = next((lang for lang in manifest["languages"] if lang["slug"] == "java"), None)
        assert java is not None
        assert java["isAvailable"] is True

        # 2. Course Details
        res_course = await ac.get("/api/v1/curriculum/languages/java/course")
        assert res_course.status_code == 200
        course = res_course.json()
        assert course["slug"] == "java"
        assert len(course["sections"]) > 0

        # 3. Lesson Details
        res_lesson = await ac.get("/api/v1/curriculum/languages/java/fundamentals/hello-world")
        assert res_lesson.status_code == 200
        lesson = res_lesson.json()
        assert lesson["slug"] == "hello-world"
        assert len(lesson["activities"]) >= 5
