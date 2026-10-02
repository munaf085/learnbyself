import pytest
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token
)
from app.core.config import settings

def test_password_hashing():
    raw = "BTechSecretPass2026!"
    hashed = hash_password(raw)
    assert hashed != raw
    assert verify_password(raw, hashed) is True
    assert verify_password("WrongPassword!", hashed) is False

def test_jwt_tokens():
    user_id = "test-user-12345"
    access_token = create_access_token(user_id)
    refresh_token = create_refresh_token(user_id)
    
    access_payload = decode_token(access_token)
    assert access_payload["sub"] == user_id
    assert access_payload["type"] == "access"
    
    refresh_payload = decode_token(refresh_token, settings.JWT_REFRESH_SECRET)
    assert refresh_payload["sub"] == user_id
    assert refresh_payload["type"] == "refresh"
