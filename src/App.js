import React, {useEffect, useMemo, useState} from 'react';

import './App.scss';

import {Button, Col, Container, Row} from 'react-bootstrap';

import InputFields from "./input/InputFields";
import Game1 from "./game1/Game1";
import HouseWinning from "./house/HouseWinning";
import useQuery from "./useQuery";

import {useHistory, useLocation} from 'react-router-dom';

function App() {
    const q = useQuery();
    const history = useHistory();
    const location = useLocation();

    const randomNumber = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 7);

    const [reloadkey, setReloadkey] = useState(() => randomNumber());

    const [inputValues, setInputValues] = useState(() =>
        q.getAll('iv').length ?
            q.getAll('iv').map(x => parseInt(x)) : [
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
            ]
    );

    const qcalc = useMemo(() => {
        q.delete('iv');
        inputValues.forEach(v => q.append('iv', v));
        q.sort();
        return q.toString();
    }, [inputValues, q]);

    useEffect(() => {
        const t = setTimeout(
            () => {
                history.replace('?' + qcalc);
            },
            500)

        return () => {
            clearTimeout(t);
        };
    }, [qcalc, history]);

    return (
        <Container fluid key={reloadkey}>
            <Row className="border-top mt-2">
                <Col>
                    <HouseWinning inputValues={inputValues}/>
                    <div className="mt-3 pt-3 border-top"/>
                    <Game1 inputValues={inputValues}/>
                </Col>
                <Col>
                    <InputFields setInputValues={setInputValues} values={inputValues}/>
                    <div className="mt-5 border-top text-right">
                        <Button size="lg" variant="dark" onClick={(e) => {
                            e.preventDefault();
                            history.push('/?');
                            setTimeout(() => window.location.reload(), 0);
                        }}>Reset</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
