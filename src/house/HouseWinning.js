import React from "react";
import {Card} from "react-bootstrap";
import House from "./House";

const HouseWinning = ({setWinning, inputValues}) => (
    <Card>
        <House no={2}
               line1={20}
               line2={100}
               line3={2000000}
               setWinning={setWinning}
               inputValues={inputValues}/>
        <div className="mt-1 mb-1 border-top"/>
        <House no={3}
               line1={10}
               line2={200}
               line3={300000}
               setWinning={setWinning}
               inputValues={inputValues}/>
        <div className="mt-1 mb-1 border-top"/>
        <House no={4}
               line1={10}
               line2={200}
               line3={100000}
               setWinning={setWinning}
               inputValues={inputValues}/>
        <div className="mt-1 mb-1 border-top"/>
        <House no={5}
               line1={25}
               line2={100}
               line3={50000}
               setWinning={setWinning}
               inputValues={inputValues}/>
        <div className="mt-1 mb-1 border-top"/>
        <House no={6}
               line1={10}
               line2={125}
               line3={40000}
               setWinning={setWinning}
               inputValues={inputValues}/>
        <div className="mt-1 mb-1 border-top"/>
        <House no={7}
               line1={10}
               line2={50}
               line3={20000}
               setWinning={setWinning}
               inputValues={inputValues}/>
        <div className="mt-1 mb-1 border-top"/>
        <House no={8}
               line1={10}
               line2={30}
               line3={10000}
               setWinning={setWinning}
               inputValues={inputValues}/>
    </Card>
);

export default HouseWinning;
