import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';

const OffCanvasExample = ({ ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <div style={{textAlign: 'center'}}>
      <div>
        <h1>안녕하세요</h1>
      </div>
      <div onClick={handleShow} className="me-2 mb-5">
        <h2><span className="h2-span-highlight">이상한 나라의 개발자들</span>의</h2>
        <h2>포트폴리오 공유 서비스입니다.</h2>
      </div>
      </div>
      <div >
      <Offcanvas show={show} onHide={handleClose} {...props} className="offcanvas-end-show">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title >
            <p className="offcanvas-title"> 만든 이들</p>
            
          </Offcanvas.Title>
          <hr/>
        </Offcanvas.Header>
        <Offcanvas.Body style={{textAlign: 'center'}}>
        <p className="offcanvas-body">🍕 김채정</p>
        <p className="offcanvas-body">🍦 이정민</p>
        <p className="offcanvas-body">🍉 김현서</p>
        <p className="offcanvas-body">🍗 배주영</p>
        <p className="offcanvas-body">🍰 엄혜진</p>
        </Offcanvas.Body>
      </Offcanvas>
      </div>
    </>
  );
}

const CreditForm = () => {
  return (
    <OffCanvasExample placement={'end'} />
  );
}

export default CreditForm;