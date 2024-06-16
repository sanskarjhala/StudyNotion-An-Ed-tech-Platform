import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import UpdateProfilePicture from "./UpdateProfilePicture";



export default function Settings(){
    return(
        <>
            <h1 className="text-4xl font-bold text-richblack-5 mb-16">
                Edit Profile
            </h1>
            
            <UpdateProfilePicture/>
            <EditProfile/>
            <UpdatePassword/>
            <DeleteAccount/>
        </>
    )
}