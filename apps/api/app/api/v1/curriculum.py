import json
import os
from pathlib import Path
from fastapi import APIRouter, HTTPException

router = APIRouter()

def get_curriculum_root() -> Path:
    # Look for data/curriculum relative to monorepo root
    current = Path(__file__).resolve()
    for parent in current.parents:
        data_dir = parent / "data" / "curriculum"
        if data_dir.exists():
            return data_dir
    raise RuntimeError("Curriculum data directory not found in repository root")

@router.get("/languages", tags=["Curriculum"])
async def list_languages():
    root = get_curriculum_root()
    manifest_path = root / "manifest.json"
    if not manifest_path.exists():
        raise HTTPException(status_code=500, detail="Curriculum manifest missing")
    with open(manifest_path, "r", encoding="utf-8") as f:
        return json.load(f)

@router.get("/languages/{language_slug}/course", tags=["Curriculum"])
async def get_course(language_slug: str):
    root = get_curriculum_root()
    course_path = root / language_slug / "course.json"
    if not course_path.exists():
        raise HTTPException(status_code=404, detail=f"Course for language '{language_slug}' not found")
    with open(course_path, "r", encoding="utf-8") as f:
        return json.load(f)

@router.get("/languages/{language_slug}/{module_slug}/{lesson_slug}", tags=["Curriculum"])
async def get_lesson(language_slug: str, module_slug: str, lesson_slug: str):
    root = get_curriculum_root()
    lesson_path = root / language_slug / module_slug / f"{lesson_slug}.json"
    if not lesson_path.exists():
        raise HTTPException(status_code=404, detail=f"Lesson '{lesson_slug}' in module '{module_slug}' not found")
    with open(lesson_path, "r", encoding="utf-8") as f:
        return json.load(f)
