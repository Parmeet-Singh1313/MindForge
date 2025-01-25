import { UserInputContext } from "@/app/_context/UserInputContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContext } from "react";

function TopicDescription() {

    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
    const handleInputChange = (fieldName, value) => {
        setUserCourseInput(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }
    return (
        <div className="mx-30 lg:mx-44">
            {/* Input Topic */}
            <div className="mt-5 text-xl">
                <label>💡 Write the topic for which you want to generate a course (e.g., Python Course, Yoga, etc,): </label>
                <Input placeholder={'Topic'} defaultValue={userCourseInput?.topic}
                    className="h-14 text-xl" onChange={(e) => handleInputChange('topic', e.target.value)} />
            </div>
            <div className="mt-5 text-xl">
                <label >📝 Tell us more about your course, what you want to include in the course (Optional)</label>
                <Textarea placeholder="About your course"
                    defaultValue={userCourseInput?.description} className="h-25 text-xl" onChange={(e) => handleInputChange('description', e.target.value)} />
            </div>

            {/* Text Area */}
        </div>

    )
}

export default TopicDescription
