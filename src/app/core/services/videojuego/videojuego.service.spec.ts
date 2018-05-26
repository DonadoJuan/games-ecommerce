import { TestBed, inject } from '@angular/core/testing';

import { VideojuegoService } from './videojuego.service';

describe('VideojuegoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideojuegoService]
    });
  });

  it('should be created', inject([VideojuegoService], (service: VideojuegoService) => {
    expect(service).toBeTruthy();
  }));
});
