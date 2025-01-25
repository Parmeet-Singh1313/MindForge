"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { CldImage, CldUploadWidget } from "next-cloudinary";

export default function CourseBasicInfo({ course, refreshData, edit = true }) {
    const [publicId, setPublicId] = useState();
    const [downloadURL, setDownloadURL] = useState(null);
    const [bannerUrl, setBannerUrl] = useState(null);

    useEffect(() => {
        if (course?.courseBanner && course.courseBanner !== "/placeholder.png") {
            setBannerUrl(course.courseBanner);
            setPublicId(course.courseBanner.split('/').pop().split('.')[0]);
        } else {
            setBannerUrl(null);
        }
    }, [course]);

    useEffect(() => {
        const updateBanner = async () => {
            if (downloadURL && course?.id) {
                try {
                    await db.update(CourseList)
                        .set({ courseBanner: downloadURL })
                        .where(eq(CourseList.id, course.id));

                    setBannerUrl(downloadURL);
                    await refreshData();
                    window.location.reload();
                } catch (error) {
                    console.error("Error updating course banner:", error);
                }
            }
        };

        if (downloadURL) {
            updateBanner();
        }
    }, [downloadURL, course?.id, refreshData]);

    const handleUploadSuccess = (result) => {
        if (result.event === "success") {
            const { public_id, secure_url } = result.info;
            setPublicId(public_id);
            setDownloadURL(secure_url);
        }
    };

    const isValidBanner = bannerUrl && bannerUrl !== "/placeholder.png";

    return (
        <div className="p-10 border rounded-xl shadow-sm mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h2 className="font-bold text-3xl">
                        {course?.courseOutput?.course?.courseName}
                        {edit && <EditCourseBasicInfo course={course} refreshData={refreshData} />}
                    </h2>
                    <p className="text-sm text-gray-400 mt-3">
                        {course?.courseOutput?.course?.description}
                    </p>
                    <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
                        <HiOutlinePuzzle />
                        {course?.category}
                    </h2>
                    {!edit && <Link href={'/course/' + course?.courseId + '/start'}>
                        <Button className="w-full mt-5">Start</Button>
                    </Link>}
                </div>
                <div className="flex justify-end relative h-[300px] w-full">
                    {isValidBanner ? (
                        <div className="relative w-full h-full">
                            <CldImage
                                src={bannerUrl}
                                alt="Course Banner"
                                fill
                                className="object-cover rounded-xl"
                            />
                            {edit && (
                                <CldUploadWidget
                                    uploadPreset="ml_default"
                                    onSuccess={handleUploadSuccess}
                                >
                                    {({ open }) => (
                                        <Button
                                            onClick={() => open()}
                                            className="absolute bottom-4 right-4 bg-primary hover:bg-indigo-300 hover:text-black">
                                            Change Image
                                        </Button>
                                    )}
                                </CldUploadWidget>
                            )}
                        </div>
                    ) : (
                        <div className="relative w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
                            <CldUploadWidget
                                uploadPreset="ml_default"
                                onSuccess={handleUploadSuccess}
                            >
                                {({ open }) => (
                                    <Button
                                        onClick={() => open()}
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        Upload Image
                                    </Button>
                                )}
                            </CldUploadWidget>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}