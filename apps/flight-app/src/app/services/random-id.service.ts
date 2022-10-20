import { Injectable } from '@angular/core';
import { v1, v4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class RandomIdService {
  getUuidV4(): string {
    return v4();
  }

  getUuidV1(): string {
    return v1();
  }
}
