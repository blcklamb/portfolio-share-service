import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";

const Certificates = ({ portfolioOwnerId, isEditable }) => {
    
    const [certificates, setCertificates] = useState([])
    const [isAdding, setIsAdding] = useState(false)

    return (
        <Card>
            <Card.Body>
                <Card.Title>자격증</Card.Title>
                {certificates.map((certificate) => (
                    <Certificate 
                        key={certificate.id}
                        certificate={certificate}
                        setCertificates={setCertificates}
                        isEditable={isEditable}
                    />
                ))}
                {isEditable && (
                    <Row className="mt-3 text-center mb-4">
                        <Col sm={{ span: 20 }}>
                            <Button onClick={() => setIsAdding(true)}>+</Button>
                        </Col>
                    </Row>
                )}
                {isAdding && (
                    <CertificateAddForm
                        portfolioOwnerId={portfolioOwnerId}
                        setAwards={setCertificates}
                        setIsAdding={setIsAdding}
                    />
                )}
            </Card.Body>
        </Card>
    )
}

export default Certificates;