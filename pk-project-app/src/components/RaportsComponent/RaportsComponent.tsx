import React, { useEffect, useRef, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Container, Row, Col, Form, FormText } from 'react-bootstrap';
import { getUserTeams } from '../../api/teams';
import { getBoardByTeamId } from '../../api/boards';
import { getColumnByBoardId } from '../../api/columns';
import { getCardByColumnId } from '../../api/cards';
import RaportsDoneComponent from './RaportsDoneComponent';
import RaportsDoneUserComponent from './RaportsDoneUserComponent';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
};

const RaportsComponent = () => {

    const [dataBS, setDataBS] = useState(null);
    const [selectValue, setSelectValue] = useState(0);
    const [myTeams, setMyTeams] = useState([]);
    const [loadingRaport, setLoadingRaport] = useState(0);

    useEffect(() => {
        getTeams();
    }, [])

    const getTeams = async () => {
        setMyTeams(await getUserTeams());
    }

    const generateRandomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    const rgbGenerate = () => {
        let r = generateRandomNumber(0, 255);
        let g = generateRandomNumber(0, 255);
        let b = generateRandomNumber(0, 255);

        return r + ',' + g + ',' + b;
    }

    const formatDate = (date: any, isHours = false) => {
        let dateStr = '';

        if (isHours) {
            dateStr =
                date.getFullYear() + "-" +
                ("00" + date.getDate()).slice(-2) + "-" +
                ("00" + (date.getMonth() + 1)).slice(-2) + " " +
                ("00" + date.getHours()).slice(-2) + ":" +
                ("00" + date.getMinutes()).slice(-2) + ":" +
                ("00" + date.getSeconds()).slice(-2);
        }
        else {
            dateStr =
                date.getFullYear() + "-" +
                ("00" + date.getDate()).slice(-2) + "-" +
                ("00" + (date.getMonth() + 1)).slice(-2);
        }

        return dateStr;
    }

    const dateRange = (isHours = false) => {
        const dateArray = [];

        for (let i = 13; i >= 0; i--) {
            let currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - i);
            dateArray.push(formatDate(new Date(currentDate), isHours));
        }
        return dateArray;
    }

    const labels = dateRange();

    const onChangeSelect = async (event: any) => {
        setSelectValue(event.target.value);
        setLoadingRaport(1);

        let boardsTeam = await getBoardByTeamId(event.target.value);
        let datasets: any = undefined;
        let dataArray: any = undefined;

        if (boardsTeam) {
            boardsTeam.map(async (boards: any, index: number) => {
                if (boards.boardTypeId === "21adbda8-c90d-49dd-9778-e9ab9ac86d46") { // defined scrum board

                    let rgb = rgbGenerate();
                    let newBoards = {
                        label: boards.name,
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        borderColor: 'rgb(' + rgb + ')',
                        backgroundColor: 'rgba(' + rgb + ', 0.5)',
                    }

                    if (datasets === undefined) {
                        datasets = [newBoards];
                    }
                    else {
                        datasets = Promise.resolve([
                            ...datasets,
                            newBoards
                        ]);
                    }

                    let columnsByBoard = await getColumnByBoardId(boards.id);

                    await columnsByBoard.map(async (columns: any) => {
                        let cardsByColumns = await getCardByColumnId(columns.id);

                        if (cardsByColumns) {
                            let es: number = 0;
                            await cardsByColumns.map(async (cards: any) => {

                                dataArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                                if (formatDate(new Date(cards.createdDate)) === labels[0]) {
                                    let ds = await datasets;
                                    let d = ds.find((e: any) => e.label === boards.name);
                                    let notd = ds.filter((e: any) => e.label !== boards.name);

                                    dataArray = d.data;
                                    es = es + cards.estimate;

                                    dataArray[0] = es;
                                    for (let i = 1; i < labels.length; i++) {
                                        if (dataArray[i] === 0) dataArray[i] = es;
                                    }

                                    //dataArray[0] += cards.estimate;
                                    let retryData = {
                                        label: d.label,
                                        data: dataArray,
                                        borderColor: d.borderColor,
                                        backgroundColor: d.backgroundColor
                                    };

                                    datasets = Promise.resolve([
                                        ...notd,
                                        retryData
                                    ]);
                                }
                                else {
                                    for (let i = 1; i < labels.length; i++) {
                                        if (cards.statusId === "51fdff19-8c1a-4dfc-912d-71438e206e63") { // defined Done
                                            if (labels[i] === formatDate(new Date(cards.updatedStatusDoneDate))) {

                                                let ds = await datasets;
                                                let d = ds.find((e: any) => e.label === boards.name);
                                                let notd = ds.filter((e: any) => e.label !== boards.name);

                                                dataArray = d.data;

                                                dataArray[i] = dataArray[i] - cards.estimate;
                                                if (dataArray[i] < 0) dataArray[i] = 0;

                                                let retryData = {
                                                    label: d.label,
                                                    data: dataArray,
                                                    borderColor: d.borderColor,
                                                    backgroundColor: d.backgroundColor
                                                };

                                                datasets = Promise.resolve([
                                                    ...notd,
                                                    retryData
                                                ]);
                                            }
                                        }
                                        else {
                                            if (labels[i] === formatDate(new Date(cards.createdDate))) {

                                                let ds = await datasets;
                                                let d = ds.find((e: any) => e.label === boards.name);
                                                let notd = ds.filter((e: any) => e.label !== boards.name);

                                                dataArray = d.data;
                                                dataArray[i] = dataArray[i] + cards.estimate;

                                                let retryData = {
                                                    label: d.label,
                                                    data: dataArray,
                                                    borderColor: d.borderColor,
                                                    backgroundColor: d.backgroundColor
                                                };

                                                datasets = Promise.resolve([
                                                    ...notd,
                                                    retryData
                                                ]);
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
            });

            setTimeout(() => {
                datasets.then((e: any) => {
                    setLoadingRaport(2);
                    setDataBS({
                        //@ts-ignore
                        labels,
                        datasets: e
                    });
                })
            }, 500)
        }
        else {
            setLoadingRaport(3);
            setDataBS(null);
        }

    }

    return (
        <Container className="mt-3">
            <Row><Col><h1>Burndown Scrum (Status Done)</h1></Col></Row>
            <Row className="mt-3">
                <Col>
                    <Form.Select aria-label="Select Teams" onChange={onChangeSelect} value={selectValue}>
                        <option value="0" disabled>Wybierz Team</option>
                        {myTeams && myTeams.map((team: any, index) =>
                            <option value={team.id} key={index}>{team.name}</option>
                        )}
                    </Form.Select>
                </Col>
            </Row>
            <Row className="mt-4 mb-5">
                <Col>
                    {loadingRaport === 1 && dataBS === null && <h2>Trwa wczytywanie raportu....</h2>}
                    {loadingRaport === 2 && dataBS !== null && <Line options={options} data={dataBS} />}
                    {loadingRaport === 3 && dataBS === null && <h2>Team nie posiada żadnych tablic</h2>}
                </Col>
            </Row>
            <Row className="mt-5 mb-5">
                <Col>
                    <RaportsDoneComponent labels={labels} rgbGenerate={rgbGenerate} formatDate={formatDate} />
                </Col>
            </Row>
            <Row className="mt-5 mb-5">
                <Col>
                    <RaportsDoneUserComponent labels={labels} rgbGenerate={rgbGenerate} formatDate={formatDate} />
                </Col>
            </Row>
        </Container>
    );

}

export default RaportsComponent;