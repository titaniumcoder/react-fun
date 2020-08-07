import React from "react";
import {Col, FormControl} from "react-bootstrap";

const InputForm = ({no, gamesValue, setGameValues, matchingCalc}) =>
    <Col xs={1}>
        <FormControl
            value={gamesValue[no]}
            size="sm"
            onChange={(e) => {
                const value = parseInt(e.target.value);

                setGameValues(
                    [
                        ...(gamesValue.slice(0, no)),
                        value,
                        ...(gamesValue.slice(no + 1))
                    ]);
            }}
            style={{backgroundColor: matchingCalc[no] ? 'white' : '#ffbf00'}}
        />
    </Col>

export default InputForm;
