import { Component, OnInit } from '@angular/core';
import { CooptationService } from '../services/cooptation-service.service';
import { CooptationResponseDTO } from '../models/cooptation.model';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  total = 0;
  soumis = 0;
  enRevue = 0;
  valide = 0;
  rejete = 0;


pieChartData: ChartData<'pie', number[], string> = {
  labels: ['Soumis', 'En revue', 'Validé', 'Rejeté'],
  datasets: [
    {
      data: [0, 0, 0, 0]
    }
  ]
};
  pieChartType: ChartType = 'pie';

  constructor(private cooptationService: CooptationService) {}

  ngOnInit(): void {
    this.cooptationService.getAllCooptations().subscribe((data: CooptationResponseDTO[]) => {
      this.total = data.length;
      this.soumis = data.filter(c => c.statut === 'SOUMIS').length;
      this.enRevue = data.filter(c => c.statut === 'EN_REVUE').length;
      this.valide = data.filter(c => c.statut === 'VALIDE').length;
      this.rejete = data.filter(c => c.statut === 'REJETE').length;

      this.pieChartData = {
        labels: ['Soumis', 'En revue', 'Validé', 'Rejeté'],
        datasets: [{
          data: [this.soumis, this.enRevue, this.valide, this.rejete],
          backgroundColor: ['#f39c12', '#3498db', '#2ecc71', '#e74c3c']
        }]
      };
    });
  }
}
