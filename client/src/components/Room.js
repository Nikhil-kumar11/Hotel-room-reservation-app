import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
function Room({ room, fromDate, toDate }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="smallimg" />
      </div>
      <div className="col-md-7 ">
        <h1>{room.name}</h1>
        <b>
          {""}
          <p>Max count: {room.maxcount}</p>
          <p>Phone number: {room.phonenumber}</p>
          <p>Type: {room.type}</p>
        </b>
        <div style={{ float: "right" }}>
          {fromDate && toDate && (
            <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
              <Button className="btn btn-primary">Book now</Button>
            </Link>
          )}

          <button className="btn btn-primary m-2" onClick={handleShow}>
            View details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Carousel prevLabel="" nextLabel="">
          {room.imageurls.map((url) => {
            return (
              <Carousel.Item>
                <img className="d-block w-100 bigimg" src={url} />
              </Carousel.Item>
            );
          })}
        </Carousel>
        <p>{room.description}</p>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
