import RenderSteps from "./RenderSteps"

export default function AddCourse() {
    
    return (
        <>
            <div className="text-richblack-5 flex justify-between">
                <div className="w-[65%]">
                    <h1>Add Course</h1>
                    <div>
                        <RenderSteps />
                    </div>
                </div>
                <div className="w-[25%] bg-richblack-700 rounded-lg h-fit p-7">
                    <p className="text-xl my-4 font-bold">Code Upload Tips</p>
                    <ul className="text-xs space-y-1">
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                    </ul>
                </div>
            </div>
        </>
    )
}