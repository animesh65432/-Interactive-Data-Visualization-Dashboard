import React, { useEffect, useState } from 'react';
import { Calendar } from "lucide-react";
import { format, parse } from "date-fns";
import Cookies from 'js-cookie';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useDatahook } from "../hooks";
import { useDispatch } from "react-redux"
import { removetoken } from "../store/slices/AuthSlices"
import { dateTypes } from "../types"

const Navbar = () => {
    const [date, setDate] = useState({ from: new Date(), to: new Date() });
    const { fetchData } = useDatahook();
    const [ageGroup, setAgeGroup] = useState(() => {
        const savedAgeGroup = Cookies.get("ageGroup");
        return savedAgeGroup || "";
    });
    const [gender, setGender] = useState(() => {
        const savedGender = Cookies.get("gender");
        return savedGender || ""
    });
    const dispatch = useDispatch()

    const handleclick = () => {
        const formattedFrom = format(date.from, 'M/d/yyyy');
        const formattedTo = format(date.to, 'M/d/yyyy');

        Cookies.set("date", JSON.stringify({ from: formattedFrom, to: formattedTo }), { expires: 7 });
        Cookies.set("ageGroup", ageGroup, { expires: 7 });
        Cookies.set("gender", gender, { expires: 7 });


        if (ageGroup.length > 0 && gender.length > 0) {
            fetchData({ startDate: formattedFrom, endDate: formattedTo, gender: gender, ageRange: ageGroup });
        }
        else if (ageGroup.length > 0) {
            fetchData({ startDate: formattedFrom, endDate: formattedTo, ageRange: ageGroup });
        }
        else if (gender.length > 0) {
            fetchData({ startDate: formattedFrom, endDate: formattedTo, gender });
        }
        else {
            fetchData({ startDate: formattedFrom, endDate: formattedTo });
        }
    }

    const handleDateChange = (newDate: Date, type: "from" | "to") => {
        setDate((prevState) => ({
            ...prevState,
            [type]: newDate,
        }));
    };

    const onlogout = () => {
        dispatch(removetoken())
    }

    useEffect(() => {

        const savedAgeGroup = Cookies.get("ageGroup");
        const savedGender = Cookies.get("gender");
        const date = Cookies.get("date")

        if (!date) {
            return
        }

        const convertthejson = JSON.parse(date) as dateTypes

        const formattedFrom = convertthejson.from
        const formattedTo = convertthejson.to





        if (savedAgeGroup) setAgeGroup(savedAgeGroup);
        if (savedGender && savedGender.length > 0) {
        }
        if (convertthejson.from && convertthejson.to) {
            setDate({
                from: parse(convertthejson.from, "M/d/yyyy", new Date()),
                to: parse(convertthejson.to, "M/d/yyyy", new Date()),
            });
        }


        if (savedAgeGroup && savedAgeGroup.length > 0 && savedGender && savedGender.length > 0) {
            fetchData({ startDate: formattedFrom, endDate: formattedTo, gender: savedGender, ageRange: savedAgeGroup });
        }
        else if (savedAgeGroup && savedAgeGroup.length > 0) {
            fetchData({ startDate: formattedFrom, endDate: formattedTo, ageRange: ageGroup });
        }
        else if (savedGender && savedGender.length > 0) {
            fetchData({ startDate: formattedFrom, endDate: formattedTo, gender: savedGender });
        }
        else {
            fetchData({ startDate: formattedFrom, endDate: formattedTo });
        }

    }, []);



    return (
        <header className="w-full border-b bg-white">
            <nav className="container mx-auto px-4">
                <section className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
                    <h1 className="text-lg font-semibold">Analytics Dashboard</h1>

                    <form
                        className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <fieldset className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
                            <Select value={ageGroup} onValueChange={setAgeGroup}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Age group" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="15-25">15-25 years</SelectItem>
                                    <SelectItem value=">25">Over 25 years</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={gender} onValueChange={setGender}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                </SelectContent>
                            </Select>

                            <fieldset className="flex items-center gap-2 w-full sm:w-auto">
                                <legend className="sr-only">Date Range</legend>

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full sm:w-[130px]">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            {date.from ? format(date.from, "MM/dd/yyyy") : "Start"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <CalendarComponent
                                            mode="single"
                                            selected={date.from}
                                            onDayClick={(newDate) => handleDateChange(newDate, "from")}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full sm:w-[130px]">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            {date.to ? format(date.to, "MM/dd/yyyy") : "End"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="end">
                                        <CalendarComponent
                                            mode="single"
                                            selected={date.to}
                                            onDayClick={(newDate) => handleDateChange(newDate, "to")}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </fieldset>

                            <Button type="button" className="w-full sm:w-[100px] mt-4 sm:mt-0" onClick={handleclick}>
                                Apply
                            </Button>

                            <Button type="button" className="w-full sm:w-[100px] mt-4 sm:mt-0" onClick={onlogout}>
                                Logout
                            </Button>
                        </fieldset>
                    </form>
                </section>
            </nav>
        </header>
    );
};

export default Navbar;
