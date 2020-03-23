/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventoService } from './evento.service';

describe('Service: Evento.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventoService]
    });
  });

  it('should ...', inject([EventoService], (service: EventoService) => {
    expect(service).toBeTruthy();
  }));
});
