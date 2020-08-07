import React from "react";
import {Col, Form} from "react-bootstrap";

const InputField = ({no, value, setValue}) => {
    return (
        <Col xs={1}>
            <Form.Label srOnly>Field for {no}</Form.Label>
            <Form.Control type="number" value={value} onChange={setValue}/>
        </Col>
    )
}

export default ({values, setValue}) => {
    const noOfFields = values.length;

    const inputFields = [];

    const transformAndSetValue = (e, i) => {
        const value = parseInt(e.target.value);
        setValue(i, value);
    }

    for (let i = 0; i < noOfFields; i++) {
        inputFields.push(<InputField no={i} key={i} value={values[i]} setValue={(e) => transformAndSetValue(e, i)}/>);
    }

    return (
        <Form>
            <Form.Row>
                <Col xs={true}/>
                {
                    inputFields
                }
                <Col xs={true}/>
            </Form.Row>
        </Form>
    )
}