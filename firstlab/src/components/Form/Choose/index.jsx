import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";

import Subsection from "../../SubSection";
import Button from "../../Button";
import DropDown from "../DropDown";
import Switch from "../Switch";

import style from "./style.module.scss";
import {changeWithTrace} from "../../../redux/actions/changeData";

const Choose = () => {
    const dispatch = useDispatch();

    const [withTrace, setWithTrace] = useState(false);
    const [data, setData] = useState({options: {value: "", label: ""}});

    const getOptions = (minVal, maxValue, step) => {
        const options = []
        for (let num = minVal; num <= maxValue; num += step) {
            options.push({ value: num, label: num.toString() });
        }

        return options
    }

    useEffect(() => {
        console.log(withTrace)
        dispatch(changeWithTrace(withTrace));
    }, [withTrace])

    return (
        <>
            <Subsection.Wrapper>
                <Subsection.Label text="Загрузить исходные данные:"/>
                <Subsection.Content>
                    <div className={style.optionWrapper}>
                        <div className={style.titleModal}>Выбрать из раннее загруженных:</div>
                        <DropDown
                            options={getOptions(5, 60, 5)}
                            placeholder="10"
                            onSelect={(option) => {
                                setData({
                                    ...data,
                                    options: { ...data.options, value: option.value, label: option.label }
                                })
                            }}
                            selected={{ value: data.options.value, label: data.options.label }}
                            noWrap
                        />
                    </div>

                    <Button>
                        Загрузить
                    </Button>
                </Subsection.Content>
            </Subsection.Wrapper>

            <div className={style.optionWrapper}>
                <div className={style.titleModal}>Печать с трассировкой:</div>
                <div className={style.inputModal}>
                    <Switch checked={withTrace}
                            onChange={() => {
                                setWithTrace(!withTrace)
                            }}/>
                </div>
            </div>
        </>
    );
}

export default Choose;