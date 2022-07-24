import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

export const getQueryParam = (key: string): Observable<string | null> =>
  inject(ActivatedRoute).queryParamMap.pipe(
    map((paramMap) => paramMap.get(key))
  );
