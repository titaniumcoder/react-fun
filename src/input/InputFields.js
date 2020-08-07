import React from "react";
import InputRow from "./InputRow";
import {Jumbotron} from "react-bootstrap";

function InputFields({values, setInputValues}) {
    const firstFieldInRow = [0, 1, 4, 10, 17, 25, 33, 40, 46, 49, 50];

    const setValue = (row, col, value) => {
        const newValues = [...values];
        newValues[firstFieldInRow[row] + col] = value;
        setInputValues(newValues);
    }

    const inValues = (row) => [...values.slice(firstFieldInRow[row], firstFieldInRow[row + 1])];

    const inputRows = []

    for (let i = 0; i < 10; i++) {
        inputRows.push(
            <InputRow key={i} values={inValues(i)} setValue={(col, value) => setValue(i, col, value)}/>
        )
    }

    return (
        <Jumbotron>
            <div>
                {inputRows.slice(0, 5)}
                <div className="border-top mt-3 mb-3"/>
                {inputRows.slice(5)}
            </div>
        </Jumbotron>
    )
}

export default InputFields;
