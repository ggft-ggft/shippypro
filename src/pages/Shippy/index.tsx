import { ConnectState } from '@/models/connect';
import { iatas } from '@/utils/iatas';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Select, Spin, Tooltip } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useState } from 'react';
import { connect, ConnectProps, FlightModelState } from 'umi';
const { Option } = Select;

export interface IShippyProps extends ConnectProps {
  flight: FlightModelState;
  loading?: Loading;
}

interface Loading {
  airports?: boolean;
  airlines?: boolean;
  flights?: boolean;
}

const Shippy: React.FC<IShippyProps> = ({ loading, dispatch, flight }) => {
  const [partenza, setPartenza] = useState<string | null>(null);
  const [arrivo, setArrivo] = useState<string | null>(null);

  useEffect(() => {
    dispatch!({
      type: 'flight/fetchAirports',
    });
    dispatch!({
      type: 'flight/fetchAirlines',
    });
  }, []);

  const fly = () => {
    if (partenza && arrivo) {
      dispatch!({
        type: 'flight/fetchFlights',
        payload: {
          da: partenza,
          a: arrivo,
        },
      });
    }
  };

  function handlePartenza(value: string) {
    setPartenza(value);
  }
  function handleArrivo(value: string) {
    setArrivo(value);
  }

  const formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  });

  const getAirline = (id: number) => {
    return flight?.airlines?.find((airline) => airline.id === id);
  };

  const getAirport = (id: number | undefined) => {
    return flight?.airports?.find((a) => a.id === id)?.codeIata;
  };

  return (
    <div>
      {/* <pre>{JSON.stringify(flight?.airports, null, 2)}</pre> */}
      <Row justify="space-between" style={{ marginTop: '80px' }}>
        <Col span={8}>
          <Title level={2}>Partenza</Title>
          <Select loading={loading?.airports} style={{ width: '100%' }} onChange={handlePartenza}>
            {flight?.airports?.map((airport) => {
              return (
                <Option key={airport.codeIata} value={airport.codeIata}>
                  ({airport.codeIata}) {iatas[airport.codeIata]?.name}
                </Option>
              );
            })}
          </Select>
        </Col>
        <Col span={8}>
          <Title level={2}>Arrivo</Title>
          <Select loading={loading?.airports} style={{ width: '100%' }} onChange={handleArrivo}>
            {flight?.airports?.map((airport) => {
              return (
                <Option key={airport.codeIata} value={airport.codeIata}>
                  ({airport.codeIata}) {iatas[airport.codeIata]?.name}
                </Option>
              );
            })}
          </Select>
        </Col>
      </Row>
      <Row style={{ marginTop: 30 }} justify="end">
        <Col>
          <Button disabled={!partenza || !arrivo} loading={loading?.flights} type="primary" shape="round" icon={<SearchOutlined />} onClick={fly} size="large">
            {' '}
            Cerca{' '}
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: 30 }}>
        <Col span={24}>
          {flight?.flightResult && (
            <Spin spinning={!!loading?.flights}>
              <Card bordered={true} style={{ width: '100%', marginBottom: 15 }}>
                <Row>
                  <Col span={18} style={{ paddingRight: '15px' }}>
                    <Row justify="space-between" gutter={15}>
                      {flight.flightResult?.flightsWithOff?.map((f) => (
                        <Col key={f.id} style={{ width: `${100 / flight!.flightResult!.flightsWithOff!.length}%` }}>
                          <Row justify="space-between" gutter={5}>
                            <Col style={{ width: `20%` }}>
                              <Tooltip placement="top" title={iatas[getAirport(f?.departureAirportId)]?.name}>
                                {getAirport(f?.departureAirportId)}
                              </Tooltip>
                            </Col>
                            <Col style={{ width: `80%`, marginTop: 15, paddingTop: 15, borderTop: '1px solid #00000040' }}>
                              <h4 style={{ textAlign: 'center' }}> {getAirline(f?.airlineId)?.name} </h4>
                            </Col>
                          </Row>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                  <Col span={2} style={{ borderRight: '1px solid #f0f0f0', paddingRight: '5px' }}>
                    <Tooltip placement="top" title={iatas[getAirport(flight.flightResult?.flightsWithOff[flight.flightResult?.flightsWithOff?.length - 1].arrivalAirportId)]?.name}>
                        {getAirport(flight.flightResult?.flightsWithOff[flight.flightResult?.flightsWithOff?.length - 1].arrivalAirportId)}
                    </Tooltip>                    
                  </Col>
                  <Col span={4} style={{ paddingLeft: '15px' }}>
                    <Title level={3}>
                      <strong>{formatter.format(flight.flightResult?.totalePrice)}</strong>
                    </Title>
                    <Button type="primary"> Prenota </Button>
                  </Col>
                </Row>
              </Card>
            </Spin>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ loading, flight }: ConnectState) => ({
  loading: {
    airports: loading.effects['flight/fetchAirports'],
    airlines: loading.effects['flight/fetchAirlines'],
    flights: loading.effects['flight/fetchFlights'],
  },
  flight,
}))(Shippy);
