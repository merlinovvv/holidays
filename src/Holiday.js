import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Select from "react-select";
import "./Holiday.css"

function Holiday() {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [country, setCountry] = useState("");
    const [countryOptions, setCountryOptions] = useState([]);

    const days = Array.from({ length: 31 }, (_, i) => ({ value: i + 1, label: i + 1 }));
    const months = moment.months().map((label, value) => ({ value: value + 1, label }));
    const years = Array.from({ length: 100 }, (_, i) => ({ value: moment().year() - i, label: moment().year() - i }));

    useEffect(() => {
        const fetchCountryOptions = async () => {
            const response = await axios.get("https://holidayapi.com/v1/countries?key=5e4a5263-ff0b-4082-bf44-fa6625074213");
            const countries = response.data.countries;
            const options = countries.map((c) => ({ value: c.code, label: c.name }));
            setCountryOptions(options);
        };
        fetchCountryOptions();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const date = moment({ day, month: month - 1, year });

        const url = `https://holidayapi.com/v1/holidays?pretty&country=${country}&year=${year}&month=${month}&day=${day}&key=5e4a5263-ff0b-4082-bf44-fa6625074213`;
        const response = await axios.get(url);
        const holidays = response.data.holidays;

        if (holidays && holidays.length > 0) {
            setHoliday(holidays[0].name);
            setDate(holidays[0].date);
        } else {
            setHoliday("");
            setDate(date.format("MMMM D, YYYY"));
        }
    };

    const [holiday, setHoliday] = useState("");
    const [date, setDate] = useState("");

    return (
        <div className="holiday-form">
            <form onSubmit={handleSubmit}>
                <label>
                    <p className="label-text">Day:</p>

                    <Select className="select-form" options={days} value={days.find((d) => d.value === day)} onChange={(option) => setDay(option.value)} />
                </label>
                <label>
                    <p className="label-text">Month:</p>

                    <Select
                        className="select-form"
                        options={months}
                        value={months.find((m) => m.value === month)}
                        onChange={(option) => setMonth(option.value)}
                    />
                </label>
                <label>
                    <p className="label-text">Year:</p>

                    <Select className="select-form" options={years} value={years.find((y) => y.value === year)} onChange={(option) => setYear(option.value)} />
                </label>
                <label>
                    <p className="label-text"> Country:</p>

                    <Select
                        className="select-form"
                        options={countryOptions}
                        value={countryOptions.find((c) => c.value === country)}
                        onChange={(option) => setCountry(option.value)}
                    />
                </label>
                <button className="form-btn" type="submit">Search</button>
            </form>

            {holiday && date ? (
                <div className="main-text">
                    <h2 className="text__title">Holiday: {holiday}</h2>
                    <p className="text__sub-title">Date: {date}</p>
                </div>
            ) : (
                <div className="main-text">
                    <h1 className="text__title">Find your holiday today</h1>
                    <p className="text__sub-title">It's definitely possible for us</p>
                </div>
            )}
        </div>
    );

}

export default Holiday;