import React, {useEffect, useMemo, useState} from "react";
import {Col, Container, Jumbotron, Row} from "react-bootstrap";
import InputForm from "./InputForm";
import useQuery from "../useQuery";
import {useHistory} from "react-router-dom";

function Game1({inputValues}) {
    const q = useQuery();
    const history = useHistory();

    const readFromSearchParam = () => {
        return q.getAll('g1').map(n => parseInt(n));
    }

    const hor = [
        [20, [0, 1]],
        [40, [2, 3, 4, 5]],
        [300, [6, 7, 8, 9, 10, 11]],
        [2000, [12, 13, 14, 15, 16, 17, 18, 19]],
        [100000, [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]],
        [5000, [30, 31, 32, 33, 34, 35, 36, 37]],
        [250, [38, 39, 40, 41, 42, 43]],
        [50, [44, 45, 46, 47]],
        [15, [48, 49]],
    ]
    const ver = [
        [5, [20,]],
        [25, [12, 21, 30,]],
        [100, [6, 13, 22, 31, 38,]],
        [500, [2, 7, 14, 23, 32, 39, 44,]],
        [10000, [0, 3, 8, 15, 24, 33, 40, 45, 48]],
        [20000, [1, 4, 9, 16, 25, 34, 41, 46, 49]],
        [1000, [5, 10, 17, 26, 35, 42, 47,]],
        [200, [11, 18, 27, 36, 43,]],
        [30, [19, 28, 37,]],
        [10, [29,]],
    ]
    const [gamesValue, setGameValues] = useState(() =>
        q.getAll('g1').length ?
            readFromSearchParam() : [
                0,
                0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0,
                0
            ]);

    const qcalc = useMemo(() => {
        if (gamesValue) {
            q.delete('g1');
            gamesValue.forEach(gv => q.append('g1', gv))
            q.sort();
        }

        return q.toString();
    }, [gamesValue, q]);

    useEffect(() => {
        history.push('?' + qcalc);

        return () => {
        };
    }, [qcalc, history]);

    const matchingCalc = useMemo(
        () => gamesValue.map(gv => gv > 0 && inputValues.indexOf(gv) >= 0),
        [gamesValue, inputValues]
    );

    const missingHorizontal = useMemo(
        () => hor.map(vals => ({
            missing: vals[1].filter(vn => !matchingCalc[vn]).length,
            win: vals[0],
            cols: vals[1].length
        })),
        [matchingCalc, hor]
    )

    const missingVertical = useMemo(
        () => ver.map(vals => ({missing: vals[1].filter(vn => !matchingCalc[vn]).length, win: vals[0]})),
        [matchingCalc, ver]
    )

    let currentCol = 0;

    return (
        <Jumbotron>
            <Container>
                <Row className="align-items-center">
                    <Col xs={2}><b>G1</b></Col>
                    {
                        missingVertical.map(v => (
                            <Col key={v.win} xs={1}
                                 className={"text-center " + ((v.missing === 0) ? "font-weight-bold mark" : "")}>{v.win}<br/><small>{v.missing}</small></Col>
                        ))
                    }
                </Row>
                {missingHorizontal.map(mnh => {
                    const cols = mnh.cols;
                    const unneeded = (10 - cols) / 2;
                    const inputForms = [];
                    for (let i = 0; i < cols; i++) {
                        inputForms.push(
                            <InputForm key={currentCol} no={currentCol++} gamesValue={gamesValue}
                                       matchingCalc={matchingCalc}
                                       setGameValues={setGameValues}/>
                        )
                    }
                    return (
                        <Row className="align-items-center" key={mnh.win}>
                            <Col xs={2}
                                 className={"text-center " + ((mnh.missing === 0) ? "font-weight-bold mark" : "")}>{mnh.win}&nbsp;
                                <small>({mnh.missing})</small></Col>

                            {!!unneeded && <Col xs={unneeded}/>}
                            {inputForms}
                            {!!unneeded && <Col xs={unneeded}/>}
                        </Row>
                    );
                })}
            </Container>
        </Jumbotron>
    )
}

export default Game1;
