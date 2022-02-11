import React, {useEffect, useRef, useState} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Container, Row, Col, Form, FormText } from 'react-bootstrap';
import {getMyAllBoards} from '../../api/boards';
import {getColumnByBoardId} from '../../api/columns';
import {getCardByColumnId} from '../../api/cards';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'right' as const,
        }
    },
    scales: {
        y: {
            ticks:{
                stepSize: 1
            }
        }
      }
};


const RaportsDoneComponent = (props:any) => {

    let [myBoards, setMyBoards] = useState([]);
    let loadingRaport = useRef(0);
    let [dataBar, setDataBar] = useState(null);
    const [selectValue, setSelectValue] = useState(0);

    useEffect(() => {
        getBoards();
    }, []);

    const getBoards = async () => {
        setMyBoards(await getMyAllBoards());
    }

    const labels = props.labels;
    const formatDate = props.formatDate;

    const onChangeSelect = async (e:any) => {
        setSelectValue(e.target.value);
        setDataBar(null);
        loadingRaport.current = 1;

        let datasets:any = undefined;

        if(datasets === undefined) {
            datasets = [{
                label: 'Done',
                data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                backgroundColor: 'rgba(' + props.rgbGenerate() + ', 0.5)',
            }];
        }

        let columns = await getColumnByBoardId(e.target.value);

        columns.map(async (column:any) => {
                let cards = await getCardByColumnId(column.id);

                if(cards) {
                    let dataArray:any = [];
                    for(let i=0; i<labels.length; i++) {
                        cards.map(async (card:any) => {
                            if(card.statusId === "51fdff19-8c1a-4dfc-912d-71438e206e63") {
                                if(formatDate(new Date(card.updatedStatusDoneDate)) == labels[i]) {

                                    let ds = await datasets;
                                    let d = ds.find((dse:any) => dse.label === "Done");
                                    let notd = ds.filter((dse:any) => dse.label !== "Done");

                                    dataArray = d.data;
                                    dataArray[i] = dataArray[i] + 1;

                                    let retryData = {
                                        label: d.label,
                                        data: dataArray,
                                        backgroundColor: d.backgroundColor
                                    };

                                    datasets = Promise.resolve([
                                        ...notd,
                                        retryData
                                    ]);
                                }
                            }
                            else {
                                if(card.statusId === "74ujer93-9t4j-5ldc-112h-34361h089j44") {
                                    if(formatDate(new Date(card.updatedStatusDoneDate)) == labels[i]) {

                                        let ds = await datasets;
                                        let d = ds.find((dse:any) => dse.label === "InProgress");
                                        let notd = ds.filter((dse:any) => dse.label !== "InProgress");
    
                                        dataArray = d.data;
                                        dataArray[i] = dataArray[i] + 1;
    
                                        let retryData = {
                                            label: d.label,
                                            data: dataArray,
                                            backgroundColor: d.backgroundColor
                                        };
    
                                        datasets = Promise.resolve([
                                            ...notd,
                                            retryData
                                        ]);
                                    }
                                }
                            }
                        });
                    }
            }
        });


        setTimeout(() => {
            datasets.then((e:any) => {
                loadingRaport.current = 2;
                setDataBar({
                    //@ts-ignore
                    labels,
                    datasets: e
                });
            })
        }, 3000)
    }

    return <>
        <Row>
        <Col>
                <h3>Liczba zadań ukończonych na tablicy:</h3>
            </Col>
        </Row>
        <Row className="mt-3">
            <Col>
                <Form.Select aria-label="Select Teams" onChange={onChangeSelect} value={selectValue}>
                    <option value="0" disabled>Wybierz Tablice</option>
                    {myBoards.map((boards:any, index:number) => <option key={index} value={boards.id}>{boards.name}</option>)}
                </Form.Select>
            </Col>
            <Row className="mt-4 mb-5">
                <Col>
                    {loadingRaport.current === 1 && dataBar === null && <h2>Trwa wczytywanie raportu....</h2>}
                    {loadingRaport.current === 2 && dataBar !== null && <Bar options={options} data={dataBar} />}
                </Col>
            </Row>
        </Row>
    </>
}

export default RaportsDoneComponent;