import React from 'react';
import classNames from "classnames";
import {calcStats} from "../../utils/helper";

const AlgoTable = ({name, dataToRender}) => {
    const templateNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "...", "m"]

    const cellValue = (index, value) => {
        if(index === 0){
            return `P${index}`
        } else {
            switch (value){
                case 1:
                    return "Г";
                case 2:
                    return "Р";
                default:
                    return "Б";
            }
        }
    }

    return (
        <div className="algo-wrapper">
            <div className="table-title">{name}</div>
            <div className="table-wrapper">
                <div className="tact-wrapper">
                    {dataToRender && dataToRender.length > 0 ?
                        Array.from(Array(dataToRender[0].length - 1).keys()).map((value, index) => (
                            <div className="item" key={`${index}_${value}`}>{value}</div>
                        ))
                        :
                        templateNums.map((value, index) => (
                            <div className="item" key={`${index}_${value}`}>{value}</div>
                        ))
                    }
                </div>
                <div className="task-wrapper">
                    {dataToRender && dataToRender.length > 0 ?
                        dataToRender.map((dataString, index)=>(
                            <div className="task-string" key={`${index}_${dataString}`}>
                                {dataString.map((value, index) => (
                                    <div
                                        className={classNames("item", {
                                                "item--r": (value === 1 && index !== 0),
                                                "item--w": (value === 2 && index !== 0)
                                        })}
                                        key={`${index}_${value}`}>
                                        {cellValue(index, value)}
                                    </div>
                                ))}
                            </div>
                        ))
                        :
                        <>
                            <div className="task-string">
                                <div className="item">P1</div>
                                {Array(13).fill("...").map((item, index) => (
                                    <div className="item" key={index}>{item}</div>
                                ))}
                            </div>
                            <div className="task-string">
                                <div className="item">...</div>
                            </div>
                            <div className="task-string">
                                <div className="item">...</div>
                            </div>
                            <div className="task-string">
                                <div className="item">Pn</div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className="stats">
                {(dataToRender && dataToRender.length > 0) && calcStats(dataToRender)}
            </div>
        </div>
    );
}

export default AlgoTable;