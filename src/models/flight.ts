import { Effect, ImmerReducer } from 'umi';

import { getAllAirlines, getAllAirports, getAllFlights, getFlights } from '@/services/flight';
import { getFilteredResults } from '@/utils/utils';

export interface Airport {
  id: number;
  codeIata: string;
  latitude: string;
  longitude: string;
}

export interface Flight {
  id: number;
  airlineId: number;
  departureAirportId: number;
  arrivalAirportId: number;
  price: number;
}

export interface FlightResult {
  flightsWithOff: Flight[];
  totalePrice: number;
}

export interface Airline {
  id: number;
  name: string;
  codeIataPrefix: string;  
  logoFilename: string;
}

export interface FlightModelState {  
  airports: Airport[];
  airlines: Airline[];
  flightResult? : FlightResult
}

export interface FlightModelType {
  namespace: string;
  state: FlightModelState;
  effects: {
    fetchFlights: Effect;
    fetchAirports: Effect;
    fetchAirlines: Effect;
  };
  reducers: {
    saveFiltered: ImmerReducer<FlightModelState>;
    saveAirports: ImmerReducer<FlightModelState>;
    saveAirlines: ImmerReducer<FlightModelState>;
  };
}

const defaultState: FlightModelState = {
  airports: [],
  airlines: [],
};

const FlightModel: FlightModelType = {
  namespace: 'flight',

  state: defaultState,

  effects: {
    *fetchFlights(_, { call, put }) {
      const response = yield call(getFlights, _.payload.da, _.payload.a);
      yield put({
        type: 'saveFiltered',
        payload: response.data,
      });
    },
    *fetchAirports(_, { call, put }) {
      const response = yield call(getAllAirports);
      yield put({
        type: 'saveAirports',
        payload: response.data,
      });
    },
    *fetchAirlines(_, { call, put }) {
      const response = yield call(getAllAirlines);
      yield put({
        type: 'saveAirlines',
        payload: response.data,
      });
    },
  },

  reducers: {    
    saveFiltered(state = defaultState, action) {
      state!.flightResult =  getFilteredResults(action.payload);
    },
    saveAirports(state = defaultState, action) {
      state!.airports = action.payload;
    }, 
    saveAirlines(state = defaultState, action) {
      state!.airlines = action.payload;
    },
  },
};

export default FlightModel;
