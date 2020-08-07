import React, {useEffect, useMemo, useState} from "react";
import {Col, Row} from "react-bootstrap";
import HouseInputForm from "./HouseInputForm";
import useQuery from "../useQuery";
import {useHistory} from "react-router-dom";

function House({no, line1, line2, line3, inputValues}) {
    const q = useQuery();
    const history = useHistory();

    const readFromSearchParam = () => {
        const singleValues = q.getAll('h' + no);
        const noValues = singleValues.map(n => parseInt(n));
        return [noValues.slice(0, 5), noValues.slice(5, 10), noValues.slice(10, 15)];
    }

    const [lines, setLines] = useState(() =>
        q.getAll('h' + no).length ?
            readFromSearchParam() :
            [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ]);

    const currentWinning = useMemo(() => {
        const remaining = lines.filter(l => l.filter(v => v === 0 || inputValues.indexOf(v) === -1).length > 0).length
        if (remaining === 3) {
            return ({lines: 0, win: 0});
        }
        if (remaining === 2) {
            return ({lines: 1, win: line1});
        }
        if (remaining === 1) {
            return ({lines: 2, win: line2});
        }
        return ({lines: 3, win: line3});
    }, [line1, line2, line3, inputValues, lines]);

    const matchingCalc = useMemo(() =>
            lines.map(line =>
                line.map(gv => gv > 0 && inputValues.indexOf(gv) >= 0)
            ),
        [lines, inputValues]
    );

    const qcalc = useMemo(() => {
        q.delete('h' + no);
        lines.forEach(line =>
            line.forEach(x =>
                q.append('h' + no, x)
            )
        )
        q.sort();

        return q.toString();
    }, [lines, q, no]);

    useEffect(() => {
        history.push('?' + qcalc);

        return () => {
        };
    }, [qcalc, history]);

    const winningClass = [
        "text-muted",
        "font-weight-bold badge badge-info",
        "font-weight-bold badge badge-primary",
        "font-weight-bold badge badge-success"
    ]

    return (
        <Row>
            <Col xs={3}>
                <h4>Spiel {no}</h4>
                <div className={winningClass[currentWinning.lines]}>Lines: {currentWinning.lines}</div>
                <div className={winningClass[currentWinning.lines]}>Win: {currentWinning.win}</div>
            </Col>
            <Col xs={9}>
                <Row>
                    <HouseInputForm line={0} col={0} matchingCalc={matchingCalc} lines={lines} setLines={setLines}/>
                    <HouseInputForm line={0} col={1} matchingCalc={matchingCalc} lines={lines} setLines={setLines}/>
                    <HouseInputForm line={0} col={2} matchingCalc={matchingCalc} lines={lines} setLines={setLines}/>
                    <HouseInputForm line={0} col={3} matchingCalc={matchingCalc} lines={lines} setLines={setLines}/>
                    <HouseInputForm line={0} col={4} matchingCalc={matchingCalc} lines={lines} setLines={setLines}/>
                </Row>
                <Row>
                    <HouseInputForm line={1} col={0} matchingCalc={matchingCalc} lines={lines} setLines={setLines}/>
                    <HouseInputForm line={1} col={1} matchingCalc={matchingCalc} lines={lines} setLines={setLines}/>
                    <HouseInputForm line={1} col={2} matchingCalc={matchingCalc} lines={lines} setLines={setLines}/>
                    <HouseInputForm line={1} col={3} matchingCalc={matchingCalc} lines={lines} setLines={setLines}/>
                    <HouseInputForm line={1} col={4} matchingCalc={matchingCalc} lines={lines} setLines={setLines}/>
                </Row>
                <Row>
                    <HouseInputForm line={2} col={0} matchingCalc={matchingCalc} lines={lines} setLines={setLines}/>
                    <HouseInputForm line={2} col={1} matchingCalc={matchingCalc} lines={lines} setLines={setLines}/>
                    <HouseInputForm line={2} col={2} matchingCalc={matchingCalc} lines={lines} setLines={setLines}/>
                    <HouseInputForm line={2} col={3} matchingCalc={matchingCalc} lines={lines} setLines={setLines}/>
                    <HouseInputForm line={2} col={4} matchingCalc={matchingCalc} lines={lines} setLines={setLines}/>
                </Row>
            </Col>
        </Row>
    )
}

export default House;
