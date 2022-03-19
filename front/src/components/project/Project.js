import React, { useState } from "react";
import ProjectEditForm from "./ProjectEditForm";
import ProjectCard from "./ProjectCard";

const Project = ({ project, setProjects, isEditable }) => {

    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            {isEditing ? (
                <ProjectEditForm 
                    currentProject={project}
                    setProjects={setProjects}
                    setIsEditing={setIsEditing}                
                />
            ) : (
                <ProjectCard 
                    project={project}
                    setProjects={setProjects}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}
                />
            )}
        </>
    )
}

export default Project;