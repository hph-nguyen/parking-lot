import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface CurrentState {
  parking_lot_id: number;
  free: number;
  occupied: number;
  soon_due: number;
  due: number;
  overdue: number;
  ticket_issued: number;
  ticket_could_not_be_issued: number;
  entitled_to_park: number;
  entitled_to_park_safe: number;
  ignored: number;
  due_not_monitored: number;
  overdue_not_monitored: number;
  due_beacons: number;
  overdue_beacons: number;
  not_installed: number;
  total_parking_spaces: number;
  remember_for_later: number;
  soon_due_not_monitored: number;
  soon_due_beacons: number;
}

export interface MetaData {
  parking_lot_id: number;
  address: string;
  city: string;
  zip_code: string;
  country: string;
  customer_plid: number;
  name: string;
  customer_parking_lot_name: string;
  latitude: number;
  longitude: number;
  device_type: string;
}

export interface TableValue {
  parking_lot_id?: number;
  free?: number;
  occupied?: number;
  soon_due?: number;
  due?: number;
  overdue?: number;
  total_parking_spaces?: number;
  not_installed?: number;
  watched_spaces?: number;
  name?: string;
  address?: string;
  city?: string;
  zip_code?: string;
  country?: string;
  freeRate?: number;
}
