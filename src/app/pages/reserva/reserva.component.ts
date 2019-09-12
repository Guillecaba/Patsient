import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})

export class ReservaComponent implements OnInit {

  fecha_inicio: Date;
  fecha_fin: Date;
  idPaciente: number;
  idProfesional: number;
  reservas: any;

  constructor(public reservaService: ReservaService) { }

  ngOnInit() {
    console.log('aloooo');
    this.reservaService.getTodasLasReservas().subscribe((res: any) => (
      this.reservas = res['lista']
    ));
  }
}
