"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/configs/db"
import { CourseList } from "@/configs/schema"
import { eq } from "drizzle-orm"
import { useState, useEffect } from "react"
import { HiPencilAlt } from "react-icons/hi"

function EditCourseBasicInfo({ course, refreshData }) {
    // Initialize state with current values
    const [name, setName] = useState(course?.courseOutput?.course?.courseName || '');
    const [description, setDescription] = useState(course?.courseOutput?.course?.description || '');
    const [isOpen, setIsOpen] = useState(false);

    // Update state when course data changes
    useEffect(() => {
        if (course?.courseOutput?.course) {
            setName(course.courseOutput.course.courseName);
            setDescription(course.courseOutput.course.description);
        }
    }, [course]);

    const onUpdateHandler = async () => {
        try {
            // Create a deep copy of the course output
            const updatedCourseOutput = JSON.parse(JSON.stringify(course.courseOutput));

            // Update the copy with new values
            updatedCourseOutput.course.courseName = name;
            updatedCourseOutput.course.description = description;

            // Update the database with the new copy
            await db.update(CourseList)
                .set({
                    courseOutput: updatedCourseOutput
                })
                .where(eq(CourseList.id, course.id));

            // Refresh the data
            await refreshData(true);
            setIsOpen(false);
        } catch (error) {
            console.error("Error updating course:", error);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger onClick={() => setIsOpen(true)}>
                <HiPencilAlt />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Course Title & Description</DialogTitle>
                    <DialogDescription>
                        <div className="mt-3">
                            <label>Course Title</label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <Textarea
                                className="h-40"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={onUpdateHandler}>Update</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditCourseBasicInfo