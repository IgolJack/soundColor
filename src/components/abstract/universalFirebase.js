import { db } from "../firebase/firebase";

var studentsRef = db.collection("students");
var eventsRef = db.collection("eventsCalendar");
var equipmentRef = db.collection("equipment");

export const students = [];
export var equipments = [];
export const studentsWithPass = [];
export const calendarEvents = [];

export const GetInformation = () => {
  students.length = 0;
  studentsRef
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let data = doc.data();
        students.push({
          id: data.id,
          name: data.name,
          uid: data.uid,
          email: data.email,
          concert: data.concert,
          count: data.count,
          course: data.course,
          discharges: data.discharges,
          equipment: data.equipment,
          exchange: data.exchange,
          lateness: data.lateness,
          lvl: data.lvl,
          missed: data.missed,
          responsible: data.responsible,
        });
      });
      console.log(students);
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
};

export const GetInformationWithPass = (pass) => {
  studentsWithPass.length = 0;
  studentsRef
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let data = doc.data();
        if (pass) {
          studentsWithPass.push({
            id: data.id,
            name: data.name,
            uid: data.uid,
            email: data.email,
            password: data.password,
          });
        } else {
          studentsWithPass.push({
            id: data.id,
            name: data.name,
            uid: data.uid,
            email: data.email,
          });
        }
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
};

export const addEvent = (
  id,
  title,
  meetDate,
  meetTime,
  meetPlace,
  description,
  typeOfEvent,
  cloth,
  eventDate,
  eventTime,
  eventPlace,
  cast
) => {
  eventsRef
    .doc(id)
    .set({
      id: id,
      title: title,
      meetDate: meetDate,
      meetTime: meetTime,
      meetPlace: meetPlace,
      description: description,
      typeOfEvent: typeOfEvent,
      cloth: cloth,
      eventDate: eventDate,
      eventTime: eventTime,
      eventPlace: eventPlace,
      cast: cast,
    })
    .then(console.log("Удачно"))
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
};

export const getEquipment = () => {
  equipmentRef
    .doc("equip")
    .get()
    .then((doc) => {
      var data = doc.data();
      equipments.push(data);
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
};

export const getInfoToCalendar = () => {
  calendarEvents.length = 0;
  let lastId = localStorage.getItem("EventLastId");
  eventsRef.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      const data = doc.data();
      data.id = Number(data.id);
      if (lastId < data.id) {
        lastId = data.id;
      }
      calendarEvents.push({
        id: data.id,
        title: data.title,
        start: new Date(2020, 9, 11),
        end: new Date(),
        allDay: true,
      });
    });
    console.log(calendarEvents);
    localStorage.setItem("CalendarEvents", calendarEvents);
    return calendarEvents;
  });
};
