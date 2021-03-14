import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";

import Subsection from "../../SubSection";
import Input from "../Input";
import Switch from "../Switch";
import Button from "../../Button";

import style from "./style.module.scss";

import {generate} from "../../../utils/helper";
import {addMainData, algoProcess} from "../../../redux/actions/changeData";

const Generate = () => {

    const dispatch = useDispatch();

    const [data, setData] = useState({name: "", procNums: "", traceEnabled: false});
    const [isValid, setValid] = useState(false);

    const onGenerate = async () => {
        let rawData = await generate(data.procNums);
        dispatch(addMainData(rawData));
        dispatch(algoProcess(rawData));
    }

    useEffect(() => {
        if (data.name.length > 1 && data.procNums > 0) {
            setValid(true)
        } else {
            setValid(false)
        }
    }, [data])

    return (
        <Subsection.Wrapper>
            <Subsection.Label text="Сгенерировать данные:"/>
            <Subsection.Content>
                <div className={style.optionWrapper}>
                    <div className={style.titleModal}>Дайте имя объекту выходных данных:</div>
                    <div className={style.inputModal}>
                        <Input placeholder="Имя"
                               disabled={false}
                               value={data.name}
                               onChange={e =>
                                   setData({
                                       ...data,
                                       name: e.target.value
                                   })
                               }/>
                    </div>
                </div>

                <div className={style.optionWrapper}>
                    <div className={style.titleModal}>Введите количесвто процессов:</div>
                    <div className={style.inputModal}>
                        <Input placeholder="20"
                               disabled={false}
                               value={data.procNums}
                               onChange={e =>
                                   setData({
                                       ...data,
                                       procNums: e.target.value
                                   })
                               }
                               pattern="[^0][0-9]+$|^[1-9]+$"/>
                    </div>
                </div>

                <div className={style.optionWrapper}>
                    <div className={style.titleModal}>Печать с трассировкой:</div>
                    <div className={style.inputModal}>
                        <Switch checked={data.traceEnabled}
                                onChange={() => {
                                    setData({
                                        ...data,
                                        traceEnabled: !data.traceEnabled
                                    })
                                }}/>
                    </div>
                </div>

                <Button onClick={onGenerate}
                    disabled={!isValid}>
                    Сгенерировать
                </Button>
            </Subsection.Content>
        </Subsection.Wrapper>
    );
}

export default Generate;