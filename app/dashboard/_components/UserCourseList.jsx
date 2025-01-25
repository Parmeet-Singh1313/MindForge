"use client"
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard'

function UserCourseList() {
    const { user } = useUser();
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);

    useEffect(() => {
        user && getUserCourses();
    }, [user]);

    const getUserCourses = async () => {
        setLoading(true);
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress))
        setCourseList(result);
        setUserCourseList(result);
        setLoading(false);
    }

    const NoCourseAvailable = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" className="w-full max-w-md mx-auto mt-10">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
                    text {
                        font-family: Outfit, system-ui, sans-serif;
                        font-weight: 500;
                    }
                `}
            </style>

            <text x="200" y="100" textAnchor="middle" fontSize="28" fill="#e0e7ff" opacity="0.5">
                NO COURSE AVAILABLE
                <animate
                    attributeName="y"
                    values="102;98;102"
                    dur="4s"
                    repeatCount="indefinite" />
            </text>

            <text x="200" y="100" textAnchor="middle" fontSize="28" fill="#6366f1">
                NO COURSE AVAILABLE
                <animate
                    attributeName="y"
                    values="100;96;100"
                    dur="4s"
                    repeatCount="indefinite" />
            </text>

            <line x1="100" y1="130" x2="300" y2="130" stroke="#6366f1" strokeWidth="2">
                <animate
                    attributeName="x1"
                    values="200;100;200"
                    dur="2s"
                    repeatCount="indefinite" />
                <animate
                    attributeName="x2"
                    values="200;300;200"
                    dur="2s"
                    repeatCount="indefinite" />
                <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="2s"
                    repeatCount="indefinite" />
            </line>

            <circle cx="200" cy="130" r="4" fill="#6366f1">
                <animate
                    attributeName="r"
                    values="4;6;4"
                    dur="2s"
                    repeatCount="indefinite" />
                <animate
                    attributeName="opacity"
                    values="1;0.5;1"
                    dur="2s"
                    repeatCount="indefinite" />
            </circle>
        </svg>
    )

    return (
        <div className='mt-10'>
            <h2 className='font-bold text-xl'>My AI Courses</h2>

            {loading ? (
                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <div key={index} className='w-full mt-5 h-[270px] bg-slate-200 animate-pulse rounded-lg' />
                    ))}
                </div>
            ) : courseList?.length > 0 ? (
                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {courseList?.map((course, index) => (
                        <CourseCard course={course} key={index} refreshData={() => getUserCourses()} />
                    ))}
                </div>
            ) : (
                <NoCourseAvailable />
            )}
        </div>
    )
}

export default UserCourseList