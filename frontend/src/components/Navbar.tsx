import React, { useEffect, useState } from 'react';
import { Calendar } from "lucide-react";
import { format, parse, isValid } from "date-fns";
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
import { useDispatch } from "react-redux";
import { removetoken } from "../store/slices/AuthSlices";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { paramstypes } from "../types"

const Navbar = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { fetchData } = useDatahook();

    // Initialize state from URL params first, then cookies as fallback
    const [date, setDate] = useState(() => {
        const urlStartDate = searchParams.get('startDate');
        const urlEndDate = searchParams.get('endDate');
        const cookieDate = Cookies.get("date");

        if (urlStartDate && urlEndDate) {
            const startDate = parse(urlStartDate, 'M/d/yyyy', new Date());
            const endDate = parse(urlEndDate, 'M/d/yyyy', new Date());
            if (isValid(startDate) && isValid(endDate)) {
                return { from: startDate, to: endDate };
            }
        }

        if (cookieDate) {
            try {
                const parsedDate = JSON.parse(cookieDate);
                const startDate = parse(parsedDate.from, 'M/d/yyyy', new Date());
                const endDate = parse(parsedDate.to, 'M/d/yyyy', new Date());
                if (isValid(startDate) && isValid(endDate)) {
                    return { from: startDate, to: endDate };
                }
            } catch (e) {
                console.error('Error parsing date cookie:', e);
            }
        }

        return { from: new Date(), to: new Date() };
    });

    const [ageGroup, setAgeGroup] = useState(() => {
        return searchParams.get('ageRange') || Cookies.get("ageGroup") || "";
    });

    const [gender, setGender] = useState(() => {
        return searchParams.get('gender') || Cookies.get("gender") || "";
    });

    // Initial data fetch from cookies
    useEffect(() => {
        const cookieDate = Cookies.get("date");
        const cookieAgeGroup = Cookies.get("ageGroup");
        const cookieGender = Cookies.get("gender");

        if (cookieDate) {
            try {
                const parsedDate = JSON.parse(cookieDate);
                const params: paramstypes = {
                    startDate: parsedDate.from,
                    endDate: parsedDate.to
                };

                if (cookieAgeGroup) {
                    params.ageRange = cookieAgeGroup;
                }
                if (cookieGender) {
                    params.gender = cookieGender;
                }

                // Initial fetch using cookie values
                fetchData(params);

                // Update URL to match cookie values
                const urlParams = new URLSearchParams();
                urlParams.set('startDate', parsedDate.from);
                urlParams.set('endDate', parsedDate.to);
                if (cookieAgeGroup) urlParams.set('ageRange', cookieAgeGroup);
                if (cookieGender) urlParams.set('gender', cookieGender);
                router.push(`/?${urlParams.toString()}`);
            } catch (e) {
                console.error('Error loading initial cookie data:', e);
            }
        }
    }, []);

    // Handle URL parameter changes
    useEffect(() => {
        const urlStartDate = searchParams.get('startDate');
        const urlEndDate = searchParams.get('endDate');
        const urlAgeRange = searchParams.get('ageRange');
        const urlGender = searchParams.get('gender');

        if (!urlStartDate || !urlEndDate) return;

        const params: paramstypes = {
            startDate: urlStartDate,
            endDate: urlEndDate
        };

        if (urlAgeRange) {
            params.ageRange = urlAgeRange;
            setAgeGroup(urlAgeRange);
        }

        if (urlGender) {
            params.gender = urlGender;
            setGender(urlGender);
        }

        try {
            const startDate = parse(urlStartDate, 'M/d/yyyy', new Date());
            const endDate = parse(urlEndDate, 'M/d/yyyy', new Date());

            if (isValid(startDate) && isValid(endDate)) {
                setDate({ from: startDate, to: endDate });
                fetchData(params);
            }
        } catch (e) {
            console.error('Error parsing URL dates:', e);
        }
    }, [searchParams]);

    const handleclick = () => {
        const formattedFrom = format(date.from, 'M/d/yyyy');
        const formattedTo = format(date.to, 'M/d/yyyy');

        // Update cookies with expiration
        Cookies.set("date", JSON.stringify({ from: formattedFrom, to: formattedTo }), { expires: 7 });
        if (ageGroup) {
            Cookies.set("ageGroup", ageGroup, { expires: 7 });
        } else {
            Cookies.remove("ageGroup");
        }
        if (gender) {
            Cookies.set("gender", gender, { expires: 7 });
        } else {
            Cookies.remove("gender");
        }

        // Prepare URL parameters
        const params = new URLSearchParams();
        params.set('startDate', formattedFrom);
        params.set('endDate', formattedTo);
        if (ageGroup) params.set('ageRange', ageGroup);
        if (gender) params.set('gender', gender);

        // Prepare API parameters
        const apiParams: paramstypes = {
            startDate: formattedFrom,
            endDate: formattedTo
        };
        if (ageGroup) apiParams.ageRange = ageGroup;
        if (gender) apiParams.gender = gender;

        // Fetch data and update URL
        fetchData(apiParams);
        router.push(`/?${params.toString()}`);
    };

    const handleDateChange = (newDate: Date, type: "from" | "to") => {
        setDate((prevState) => ({
            ...prevState,
            [type]: newDate,
        }));
    };

    const onlogout = () => {
        // Clear all cookies on logout
        Cookies.remove("date");
        Cookies.remove("ageGroup");
        Cookies.remove("gender");
        Cookies.remove("token");
        dispatch(removetoken());
    };

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