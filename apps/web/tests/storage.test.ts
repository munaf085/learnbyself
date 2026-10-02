import { describe, it, expect } from 'vitest';
import { MemoryStorageDriver } from '../lib/storage';

describe('Storage Manager Abstraction', () => {
  it('handles set, get, remove without crashing', () => {
    const mem = new MemoryStorageDriver();
    mem.setItem('lbs:test_key', JSON.stringify({ score: 95 }));
    
    const retrieved = mem.getItem('lbs:test_key');
    expect(retrieved).not.toBeNull();
    expect(JSON.parse(retrieved!)).toEqual({ score: 95 });

    mem.removeItem('lbs:test_key');
    expect(mem.getItem('lbs:test_key')).toBeNull();
  });
});
