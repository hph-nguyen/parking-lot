import { Component, ViewChild } from '@angular/core';
import { ParkingLotService } from '../services/parking-lot.service';
import { TableModule, Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { KnobModule } from 'primeng/knob';
import { RouterModule, Router } from '@angular/router';

import { CurrentState, MetaData, TableValue } from '../../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    KnobModule,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private parkingLotService: ParkingLotService,
    private router: Router
  ) {}

  @ViewChild('dt') dt: Table | undefined;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  clearFilter(table: Table) {
    table.clear();
  }

  tableValues: TableValue[] = [];

  fetchData() {
    this.parkingLotService.getCurrentState().subscribe({
      next: (currentStates: CurrentState[]) => {
        this.parkingLotService.getMetaData().subscribe({
          next: (metaDatas: MetaData[]) => {
            const metaDataMap = new Map<number, MetaData>();
            metaDatas.forEach((metaData) =>
              metaDataMap.set(metaData.parking_lot_id, metaData)
            );

            this.tableValues = currentStates.map((currentState) => {
              const metaData = metaDataMap.get(currentState.parking_lot_id);
              return {
                parking_lot_id: currentState.parking_lot_id,
                free: currentState.free,
                occupied: currentState.occupied,
                soon_due: currentState.soon_due,
                due: currentState.due,
                overdue: currentState.overdue,
                total_parking_spaces: currentState.total_parking_spaces,
                not_installed: currentState.not_installed,
                watched_spaces:
                  currentState.total_parking_spaces -
                  currentState.not_installed,
                name: metaData?.name,
                address: metaData?.address,
                city: metaData?.city,
                zip_code: metaData?.zip_code,
                country: metaData?.country,
                freeRate: currentState.free / currentState.total_parking_spaces,
              };
            });
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit() {
    this.fetchData();
  }

  getSeverity(freeRate: number): string {
    if (freeRate <= 0.2) {
      return 'danger';
    } else if (freeRate <= 0.5) {
      return 'warning';
    } else {
      return 'success';
    }
  }
  goToDetail(value: TableValue) {
    this.router.navigate(['detail'], { state: { data: value } });
  }
}
