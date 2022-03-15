import React, { useState } from "react";
import EduCard from "./EduCard";
import EduEditForm from "./EduEditForm";

function Edu({ edu, setEdus, isEditable }) {
    //useState로 isEditing 상태를 생성함.
    const [isEditing, setIsEditing] = useState(false);
    return (
        <>
            {isEditing ? (
                <EduEditForm
                    currentEdu={edu}
                    setEdus={setEdus}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <EduCard
                    edu={edu}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}
                />
            )}
        </>
    );
}

export default Edu;
