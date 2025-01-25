
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useState } from "react";
import { HiPencilAlt } from "react-icons/hi";

function EditChapters({ course, index, refreshData }) {

    const Chapters = course?.courseOutput?.course?.chapters;
    const [name, setName] = useState(course.courseOutput.course.chapters[index].chapterName);
    const [about, setAbout] = useState(course.courseOutput.course.chapters[index].about);

    const onUpdateHandler = async () => {
        course.courseOutput.course.chapters[index].chapterName = name;
        course.courseOutput.course.chapters[index].about = about;

        const result = await db.update(CourseList).set({
            courseOutput: course?.courseOutput
        }).where(eq(CourseList?.id, course?.id))
            .returning({ id: CourseList.id });

        console.log(result);
        refreshData(true);

    }
    return (
        <Dialog>
            <DialogTrigger><HiPencilAlt /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Chapter</DialogTitle>
                    <DialogDescription>
                        <div className="mt-3">
                            <label >Course Title</label>
                            <Input defaultValue={Chapters[index].chapterName} onChange={(e) => {
                                setName(e?.target.value)
                            }} />
                        </div>
                        <div>
                            <label >Description</label>
                            <Textarea className="h-40" defaultValue={Chapters[index].about}
                                onChange={(e) => {
                                    setAbout(e?.target.value)
                                }} />
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

export default EditChapters
