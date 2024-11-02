import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent implements OnInit {

  vehicles: Array<Vehicle> = [];
  totalVehicles: Array<{marca: string, total: number}> = [];

  constructor(private vehicleService: VehicleService) { }

  getVehicles(): void {
    this.vehicleService.getVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
    });
  }

  calculateTotalVehicles(): void {
    let brands: Array<string> = [];
    this.vehicleService.getVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
      this.vehicles.forEach((vehicle) => {
        if(!brands.includes(vehicle.marca)){
          brands.push(vehicle.marca);
        }
      });
      this.totalVehicles = brands.map((marca) => {
        return {
          marca: marca,
          total: this.vehicles.filter((vehicle) => vehicle.marca === marca).length
        };
      });
    });
  }

  ngOnInit(): void {
    this.getVehicles();
    this.calculateTotalVehicles();
  }
}
