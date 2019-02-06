import React from 'react';
import {Table} from 'react-bootstrap';

interface Props{
    data: Reading[],
    error: any
}

const ReadingTable = ({data,error}: Props) => (
    <Table>
        {
            error
                ?error
                :(
                    <>
                        <thead>
                            <tr>
                                <th>Nimi</th>
                                <th>Sensori</th>
                                <th>Lämpötila</th>
                                <th>Ilmanpaine</th>
                                <th>Kosteus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(({sensorname, temperature, pressure, humidity, timestamp}) => (
                                    <tr key={'${sensorname}-${timestamp}'}>
                                        <td>{formatDate(timestamp)}</td>
                                        <td>{sensorname}</td>
                                        <td>{temperature}</td>
                                        <td>{pressure}</td>
                                        <td>{humidity}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </>
                )
        }
    </Table>
);

const formatDate = (date:string):string =>
    new Date(date).toLocaleString('fi-Fi')

export default ReadingTable;