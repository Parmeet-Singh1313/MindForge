"use client"
import { db } from "@/configs/db"
import { Chapters, CourseList } from "@/configs/schema"
import { and, eq } from "drizzle-orm"
import { useEffect, useState } from "react"
import ChapterContent from "./_components/ChapterContent"
import ChapterListCard from "./_components/ChapterListCard"

function CourseStart({ params }) {
    const [course, setCourse] = useState();
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [chapterContent, setChapterContent] = useState();

    useEffect(() => {
        GetCourse();
    }, []);

    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId, params?.courseId))
        setCourse(result[0]);
        GetSelectedChapterContent(0);
    }

    const GetSelectedChapterContent = async (chapterId) => {
        const result = await db.select().from(Chapters)
            .where(and(
                eq(Chapters.chapterId, chapterId),
                eq(Chapters.courseId, course?.courseId)
            ))

        setChapterContent(result[0]);
        console.log(result);
    }

    return (
        <div className="flex">
            {/* Chapter List Side Bar */}
            <div className="fixed md:w-72 hidden md:block h-screen border-r shadow-md">
                <h2 className="font-medium text-lg bg-primary p-4 text-white">
                    {course?.courseOutput?.course?.courseName}
                </h2>
                <div className="max-h-[calc(100vh-64px)] overflow-y-auto">
                    {course?.courseOutput?.course?.chapters.map((chapter, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer hover:bg-indigo-50 ${selectedChapter?.chapterName === chapter?.chapterName
                                ? 'bg-indigo-100'
                                : ''
                                }`}
                            onClick={() => {
                                setSelectedChapter(chapter);
                                GetSelectedChapterContent(index);
                            }}
                        >
                            <ChapterListCard chapter={chapter} index={index} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Div */}
            <div className="md:ml-72">
                <ChapterContent chapter={selectedChapter} content={chapterContent} />
            </div>
        </div>
    )
}

export default CourseStart;