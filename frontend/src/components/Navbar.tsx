import React, { useEffect, useState } from 'react';
import { Calendar } from "lucide-react";
import { format } from "date-fns";
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

const Navbar = () => {
    const [date, setDate] = useState({
        from: new Date(),
        to: new Date(),
    });
    const [ageGroup, setAgeGroup] = useState("");
    const [gender, setGender] = useState("");

    useEffect(() => { }, [])

    return (
        <header className="w-full border-b bg-white">
            <nav className="container mx-auto px-4">
                <section className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
                    <h1 className="text-lg font-semibold">Analytics Dashboard</h1>

                    <form className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto" onSubmit={(e) => e.preventDefault()}>
                        <fieldset className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
                            <Select value={ageGroup} onValueChange={setAgeGroup} >
                                <SelectTrigger>
                                    <SelectValue placeholder="Age group" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="15-25">15-25 years</SelectItem>
                                    <SelectItem value=">25">Over 25 years</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={gender} onValueChange={setGender} >
                                <SelectTrigger>
                                    <SelectValue placeholder="Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
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
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </fieldset>

                            <Button type="submit" className="w-full sm:w-[100px] mt-4 sm:mt-0">
                                Apply
                            </Button>
                        </fieldset>
                    </form>
                </section>
            </nav>
        </header>
    );
};

export default Navbar;
