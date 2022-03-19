import React, { useState } from "react";
import CertificateEditForm from "./CertificateEditForm";
import CertificateCard from "./CertificateCard";

const Certificate = ({ certificate, setCertificates, isEditable }) => {

    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            {isEditing ? (
                <CertificateEditForm 
                    currentCertificate={certificate}
                    setCertificates={setCertificates}
                    setIsEditing={setIsEditing}                
                />
            ) : (
                <CertificateCard 
                    certificate={certificate}
                    setCertificates={setCertificates}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}
                />
            )}
        </>
    )
}

export default Certificate;