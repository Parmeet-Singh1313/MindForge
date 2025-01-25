"use client"
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineClipboardDocumentCheck, HiMiniClipboardDocumentCheck } from "react-icons/hi2";
import CourseBasicInfo from "../_components/CourseBasicInfo";

function FinishScreen({ params }) {
    const { user } = useUser();
    const [course, setCourse] = useState([]);
    const [isCopied, setIsCopied] = useState(false);
    const router = useRouter();

    useEffect(() => {
        params && GetCourse();
        console.log(params)
    }, [params, user])

    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(and(eq(CourseList?.courseId, params?.courseId),
                eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
            ))
        setCourse(result[0]);
        console.log(result);
    }

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOST_NAME + "/course/" + course?.courseId);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 3000);
        } catch (error) {
            console.error("Failed to copy URL:", error);
        }
    };

    return (
        <div className="px-10 md:px-20 lg:px-44 my-7">
            <h2 className="text-center font-bold text-2xl my-3 text-primary">Congrats! Your course is Ready</h2>
            <CourseBasicInfo course={course} refreshData={() => console.log()} edit = {false} />
            <h2 className="mt-3 ">Course URL</h2>
            <h2 className="text-center text-gray-400 border p-2 rounded-md flex gap-5 items-center">
                {process.env.NEXT_PUBLIC_HOST_NAME}/course/{course?.courseId}
                {isCopied ? (
                    <HiMiniClipboardDocumentCheck
                        className="h-5 w-5 cursor-pointer text-green-500"
                    />
                ) : (
                    <HiOutlineClipboardDocumentCheck
                        className="h-5 w-5 cursor-pointer"
                        onClick={handleCopyClick}
                    />
                )}
            </h2>
        </div>
    )
}

export default FinishScreen