"use client"
import { Button } from "@/components/ui/button"
import { GenerateChapterContent_AI } from "@/configs/AiModel"
import { db } from "@/configs/db"
import { Chapters, CourseList } from "@/configs/schema"
import service from "@/configs/service"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import { and, eq } from "drizzle-orm"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import LoadingDialog from "../_components/LoadingDialog"
import ChapterList from "./_components/ChapterList"
import CourseBasicInfo from "./_components/CourseBasicInfo"
import CourseDetail from "./_components/CourseDetail"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


function CourseLayout({ params }) {
    const { courseId } = React.use(params);
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (courseId && user) {
            GetCourse();
        }
        console.log(courseId);
    }, [courseId, user]);

    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(and(eq(CourseList?.courseId, courseId),
                eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
            ));
        setCourse(result[0]);
        console.log(result);
    }

    const GenerateChapterContent = async () => {
        if (course?.courseBanner === "/placeholder.png") {
            setShowAlert(true);
            return;
        }

        setLoading(true);
        const chapters = course?.courseOutput?.course?.chapters;
        for (const [index, chapter] of chapters.entries()) {
            const PROMPT = 'Explain the concept in Detail on Topic: ' + course?.name + ', Chapter: ' + chapter?.chapterName + ', in JSON Format with list of array with field as title, explanation on given chapter in detail, Code Example (Code field in <precode> format) if applicable.';
            console.log(PROMPT);
            try {
                let videoId = '';
                const resp = await service.getVideos(course?.name + ":" + chapter?.chapterName);
                console.log(resp);
                videoId = resp[0]?.id?.videoId;

                const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
                console.log(result?.response?.text());
                const content = JSON.parse(result?.response?.text());
                console.log(content);

                await db.insert(Chapters).values({
                    chapterId: index,
                    courseId: course?.courseId,
                    content: content,
                    videoId: videoId
                });
            } catch (e) {
                console.log(e);
            }
        }
        setLoading(false);
        await db.update(CourseList).set({
            publish: true
        });
        router.replace('/create-course/' + course?.courseId + '/finish');
    }

    return (
        <div className="mt-10 px-7 md:px-20 lg:px-44">
            <h2 className="font-bold text-center text-2xl">Course Layout</h2>
            <LoadingDialog loading={loading} />
            {/* Basic Info */}
            <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
            {/* Course Detail */}
            <CourseDetail course={course} />
            {/* List Of Lesson */}
            <ChapterList course={course} refreshData={() => GetCourse()} />
            <Button onClick={GenerateChapterContent} className="my-10">Generate Course Content</Button>

            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle> <Image src={"/caution.png"} width={50} height={50}/> Image Required</AlertDialogTitle>
                        <AlertDialogDescription>
                            Please upload a course banner image before generating content.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setShowAlert(false)}>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default CourseLayout;