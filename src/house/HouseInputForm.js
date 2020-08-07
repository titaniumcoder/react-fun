import {Col, FormControl} from "react-bootstrap";
import React from "react";

const HouseInputForm = ({line, col, lines, setLines, matchingCalc}) => {
    const replaceLine = (e) => (
        [
            ...(lines[line].slice(0, col)),
            parseInt(e.target.value),
            ...(lines[line].slice(col + 1)),
        ]
    );

    return <Col>
        <FormControl
            size="sm"
            value={lines[line][col]}
            onChange={(e) => setLines(
                [
                    ...(lines.slice(0, line)),
                    replaceLine(e),
                    ...(lines.slice(line + 1))
                ])}
            style={{backgroundColor: matchingCalc[line][col] ? 'white' : '#ffbf00'}}
        />
    </Col>;
}

export default HouseInputForm;