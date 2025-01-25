"use client"
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";

function Explore() {
    const [courseList, setCourseList] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        GetAllCourse();
    }, [pageIndex])

    const GetAllCourse = async () => {
        setLoading(true);
        try {
            const result = await db.select().from(CourseList)
                .limit(6)
                .offset(pageIndex * 6);

            const nextPage = await db.select().from(CourseList)
                .limit(1)
                .offset((pageIndex + 1) * 6);

            setCourseList(result);
            setHasMore(nextPage.length > 0);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2 className="font-bold text-3xl">Explore More Projects</h2>
            <p>Explore more projects build with AI by other users</p>

            {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="w-full h-[270px] bg-slate-200 animate-pulse rounded-lg" />
                    ))}
                </div>
            ) : (
                <>
                    {courseList?.length > 0 ? (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                            {courseList?.map((course, index) => (
                                <div key={index}>
                                    <CourseCard course={course} displayUser={true} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <NoCourseAvailable />
                    )}

                    {(courseList?.length > 0 || pageIndex > 0) && (
                        <div className="flex justify-between mt-5">
                            <Button
                                onClick={() => setPageIndex(pageIndex - 1)}
                                disabled={pageIndex === 0}
                            >
                                Previous Page
                            </Button>
                            <Button
                                onClick={() => setPageIndex(pageIndex + 1)}
                                disabled={!hasMore}
                            >
                                Next Page
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Explore