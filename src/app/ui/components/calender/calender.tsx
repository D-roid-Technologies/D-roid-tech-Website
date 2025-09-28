import React, { useState } from 'react';
// import {
//   Modal,
//   TextInput,
//   Button,
//   FlatList
// } from 'react-bootstrap';
// import { Container, Row, Col, Card, Form } from 'react-bootstrap';
// import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
// import { addEvent, updateEvent, deleteEvent } from './../../Redux/Slice/EventSlice';
// import { IonIcon } from 'react-icon';

// Event Type Definitions
type EventStatus = 'Upcoming' | 'Synced' | 'Missed' | 'Rejected' | 'Rescheduled' | 'Completed' | 'High Priority';
type EventCategory = 'Business' | 'Personal' | 'Health' | 'Social' | 'Study' | 'Work';

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    duration: string;
    location: string;
    status: EventStatus;
    participants?: string[];
    priority?: 'Low' | 'Medium' | 'High';
    reminder?: string;
    organizer?: string;
    attachments?: string[];
    category: EventCategory;
}

const CalendarScreen: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [showEventModal, setShowEventModal] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const dispatch = useDispatch();

    const events = useSelector((state: any) => state.events.events);

    const formattedSelectedDate = selectedDate?.toISOString().split('T')[0] ?? '';

    const eventsForSelectedDate = events.filter((event: Event) => event.date === formattedSelectedDate);

    const openEventModal = (event?: Event) => {
        if (event) {
            setSelectedEvent(event);
            setEventTitle(event.title);
            setEventDescription(event.description);
            setEventLocation(event.location);
            setEventTime(event.time);
        } else {
            setEventTitle('');
            setEventDescription('');
            setEventLocation('');
            setEventTime('');
            setSelectedEvent(null);
        }
        setShowEventModal(true);
    };

    const handleSaveEvent = () => {
        const event: Event = {
            id: selectedEvent ? selectedEvent.id : `${Date.now()}`,
            title: eventTitle,
            description: eventDescription,
            date: formattedSelectedDate,
            time: eventTime,
            duration: '1h',
            location: eventLocation,
            status: 'Upcoming',
            participants: [],
            priority: 'Medium',
            reminder: '',
            organizer: '',
            attachments: [],
            category: 'Business'
        };

        // selectedEvent ? dispatch(updateEvent(event)) : dispatch(addEvent(event));
        setShowEventModal(false);
    };

    const handleDeleteEvent = (eventId: string) => {
        // dispatch(deleteEvent(eventId));
        setShowEventModal(false);
    };

    return (
        <></>
        // <Container fluid>
        //   <Row className="justify-content-between align-items-center mb-3">
        //     <Col><h2 className="text-primary">D'roid Calendar</h2></Col>
        //     <Col className="text-end">
        //       <Button variant="primary">
        //         <IonIcon name="person-add" />
        //       </Button>
        //     </Col>
        //   </Row>

        //   <Calendar
        //     onChange={setSelectedDate}
        //     value={selectedDate}
        //   />

        //   <div className="mt-4">
        //     <h5>{selectedDate ? `Events for ${formattedSelectedDate}` : 'Select a Date'}</h5>
        //     {eventsForSelectedDate.length > 0 ? (
        //       <div>
        //         {eventsForSelectedDate.map((item: Event) => (
        //           <Card className="mb-2" key={item.id} onClick={() => openEventModal(item)}>
        //             <Card.Body>
        //               <Card.Title className="text-primary">{item.title}</Card.Title>
        //               <Card.Text>{item.time} - {item.location}</Card.Text>
        //             </Card.Body>
        //           </Card>
        //         ))}
        //       </div>
        //     ) : (
        //       <p className="text-muted fst-italic">No events for this day.</p>
        //     )}
        //   </div>

        //   <Button className="position-fixed bottom-0 end-0 m-4 rounded-circle" style={{ backgroundColor: '#982B3E' }} onClick={() => openEventModal()}>
        //     <IonIcon name="add" size="large" />
        //   </Button>

        //   <Modal show={showEventModal} onHide={() => setShowEventModal(false)} centered>
        //     <Modal.Header closeButton>
        //       <Modal.Title>{selectedEvent ? 'Edit Event' : 'Add Event'}</Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
        //       <Form>
        //         <Form.Group className="mb-3">
        //           <Form.Control type="text" placeholder="Event Title" value={eventTitle} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEventTitle(e.target.value)} />
        //         </Form.Group>
        //         <Form.Group className="mb-3">
        //           <Form.Control type="text" placeholder="Event Description" value={eventDescription} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEventDescription(e.target.value)} />
        //         </Form.Group>
        //         <Form.Group className="mb-3">
        //           <Form.Control type="text" placeholder="Event Location" value={eventLocation} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEventLocation(e.target.value)} />
        //         </Form.Group>
        //         <Form.Group className="mb-3">
        //           <Form.Control type="text" placeholder="Event Time" value={eventTime} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEventTime(e.target.value)} />
        //         </Form.Group>
        //       </Form>
        //     </Modal.Body>
        //     <Modal.Footer>
        //       {selectedEvent && <Button variant="danger" onClick={() => handleDeleteEvent(selectedEvent.id)}>Delete</Button>}
        //       <Button variant="secondary" onClick={() => setShowEventModal(false)}>Cancel</Button>
        //       <Button variant="primary" onClick={handleSaveEvent}>Save</Button>
        //     </Modal.Footer>
        //   </Modal>
        // </Container>
    );
};

export default CalendarScreen;