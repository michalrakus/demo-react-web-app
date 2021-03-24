import React, {useState} from "react";
import {Calendar} from "primereact/calendar";
import {TriStateCheckbox} from "primereact/tristatecheckbox";
//import {TriedaXX} from "@michalrakus/x-pokus-lib/TriedaXX";
//import {TriedaZZ} from "@michalrakus/x-pokus-lib/TriedaZZ";

export const TestovaciForm = (props: {}) => {

    // const m2 = new TriedaZZ();
    // console.log(m2.spoluZ2());
    //
    // const m3 = new TriedaXX();
    // console.log(m3.spoluXX4());

    // nefunguje dobre
    const [date, setDate] = useState<Date | undefined>(new Date("2022-12-23"));
    const [booleanValue, setBooleanValue] = useState<boolean | null>(null);
    return (
        <div>
            <h1>Testovaci form</h1>
            <div>
                <Calendar
                    value={date}
                    onChange={(e: any) => {setDate(e.value);}}
                />
                <button
                    onClick={e => {
                        setDate(new Date("2020-02-03"));
                    }}
                >
                    reset date
                </button>
                {JSON.stringify(date)}
            </div>
            <div>
                <TriStateCheckbox value={booleanValue} onChange={(e: any) => {
                    console.log(e.value);
                    let x: boolean = e.value;
                    if (x === null) {
                        x = true;
                    }
                    console.log(x);
                    setBooleanValue(x);
                }}/>
            </div>
        </div>
    );
}
