import request from '@/utils/request';

export async function getAllFlights(): Promise<any> {
  return request('/api/flights/all');
}
export async function getFlights(departureCode: string, arrivalCode: string): Promise<any> {
  // IATA Code
  return request(`/api/flights/from/${departureCode}/to/${arrivalCode}`);
}
export async function getAllAirports(): Promise<any> {
  return request('/api/airports/all');
}
export async function getAllAirlines(): Promise<any> {
  return request('/api/airlines/all');
}
