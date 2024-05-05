// src/app/services/ICacheService.ts
import { Injectable } from '@angular/core';
import { ICacheService, User } from '../models/models';

@Injectable()
export class UsersCacheService implements ICacheService<User> {
    private cache = new Map<number, User>();
    private _timestamp: number = 0;
    public get timestamp(): number {
        return this._timestamp;
    }

    public getAll(): User[] {
        return Array.from(this.cache.values());
    }

    public get(id: number): User | undefined {
        return this.cache.get(id);
    }

    public setAll(users: User[]): void {
        users.forEach(user => this.cache.set(user.id, user));
        this._timestamp = Date.now();
    }

    public set(user: User): void {
        this.cache.set(user.id, user);
    }

    public remove(id: number): void {
        this.cache.delete(id);
    }

    public clear(): void {
        this.cache.clear();
    }
}
