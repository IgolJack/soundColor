const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");


require("dotenv").config({ path: __dirname + "/variables.env" });

const sound_pass = process.env.SOUNDCOLOR_PASS;
const google= JSON.parse(process.env.GOOGLE);
const admin = require("firebase-admin");
const serviceAccount = google;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const bodyParser = require("body-parser");
const { request } = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

//======================================================================//
//=============================GET=FIREBASE=============================//
//======================================================================//
app.get("/api/deleteThisStudByAdmin", (request, response) => {
  let uid = request.query.uid || "";
  let user = request.query.user || "";


  admin
    .auth()
    .deleteUser(uid)
    .then(function () {
      console.log("Successfully deleted user");
    })
    .catch(function (error) {
      console.log("Error deleting user:", error);
    });
});



//=================получить данные всех events [{a,b,c...}]=============//
app.get("/api/getAllEvents", (request, response) => {
  db.collection("eventsCalendar")
    .get()
    .then((data) => {
      let events = [];
      data.forEach((doc) => {
        events.push({
          todoId: doc.id,
          title: doc.data().title,
          typeOfEvent: doc.data().typeOfEvent,
          members: doc.data().members,
          meetTime: doc.data().meetTime,
          meetPlace: doc.data().meetPlace,
          meetDate: doc.data().meetDate,
          id: doc.data().id,
          eventTime: doc.data().eventTime,
          eventPlace: doc.data().eventPlace,
          eventDate: doc.data().eventDate,
          equipment: doc.data().equipment,
          description: doc.data().description,
          cloth: doc.data().cloth,
          cast: doc.data().cast,
        });
      });
      return response.json(events);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
});

//============получение списка студентов [{name, uid}]===============//
app.get("/api/studentsName", (request, response) => {
  db.collection("students")
    .get()
    .then((data) => {
      let studentsNamesAndUids = [];
      data.forEach((doc) => {
        studentsNamesAndUids.push({
          name: doc.data().name,
          uid: doc.data().uid,
          email: doc.data().email,
          id: doc.data().id,
        });
      });
      return response.json(studentsNamesAndUids);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
});

//====================получение имени из UID студента================//
app.get("/api/fromUidToName", (request, response) => {
  let uid = request.query.uid || "";
  db.collection("students")
    .get()
    .then((data) => {
      data.forEach((doc) => {
        if (uid == doc.data().uid) {
          return response.json({
            name: doc.data().name,
            id: doc.data().id,
            email: doc.data().email,
          });
        }
      });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
});

//====получить данные всех студентов [{a,b,c...}] КРОМЕ АДМИНА isAdmin: true ===//
app.get("/api/getStudents", (request, response) => {
  db.collection("students")
    .get()
    .then((data) => {
      let students = [];
      data.forEach((doc) => {
        if(doc.data().isAdmin != true){
          students.push({
            concert: doc.data().concert,
            count: doc.data().count,
            course: doc.data().course,
            discharges: doc.data().discharges,
            disgrace: doc.data().disgrace,
            email: doc.data().email,
            equipment: doc.data().equipment,
            exchange: doc.data().exchange,
            id: doc.data().id,
            lateness: doc.data().lateness,
            lvl: doc.data().lvl,
            missed: doc.data().missed,
            name: doc.data().name,
            responsible: doc.data().responsible,
            uid: doc.data().uid,
          });
        }
      });
      return response.json(students);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
});

//====================создание calendar events================//
app.get("/api/createEvent", (req, res) => {
  let event = JSON.parse(req.query.event);
  console.log(event);
  db.collection("eventsCalendar")
    .doc(event.id)
    .set({
      id: event.id,
      title: event.title,
      meetDate:  event.meetDate,
      meetTime:  event.meetTime,
      meetPlace:  event.meetPlace,
      description:  event.description,
      typeOfEvent:  event.typeOfEvent,
      equipment: event.equipment,
      cloth:  event.cloth,
      eventDate:  event.eventDate,
      eventTime:  event.eventTime,
      eventPlace:  event.eventPlace,
      cast:  event.cast,
    })
    .then(console.log("Удачно"))
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
});




//TO-DO получить last id students и lastid event




app.get("/api/time", (request, response) => {
  let id = request.query.id;
  console.log(id)
  const rocks = id => {
    console.log(id + ' rocks');
  };
 setTimeout(rocks, id, 'Node.js');

  
  
});


























const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sound.color.app@gmail.com',
    pass: sound_pass, 
  }
});




//отправка email
app.get("/api/pushEmail", (request, response) => {
  console.log(request.query.email)


const mailOptions = {
  from: 'sound.color.app@gmail.com',
  to: request.query.email,
  subject: 'Замена',
  text: "Вас просят заменить себя в мероприятии",
  html: "<p>Вас просят заменить себя в мероприятии</p>"
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error)
    return response.json(error);
    
  } else {
    return response.json('Email sent: ' + info.response);
  }
});

});




//получить данные всех студентов [{a,b,c...}] КРОМЕ админа И КРОМЕ ПЕРЕДЕННОГО ЗНАЧЕНИЯ ИЛИ МАССИВА
// app.get("/api/getStudentsOutPersons", (request, response) => {
//   let names = [];
//   let uids = [];

//    names = request.query.names.split(',')
//    uids = request.query.uids.split(',')
 

//   db.collection("students")
//     .get()
//     .then((data) => {
//       let students = [];
//       data.forEach((doc) => {
//         names.forEach(name => { uids.forEach(uid => {
//           if(doc.data().isAdmin != true && doc.data().name != name && doc.data().uid != uid){
//             students.push({
//               concert: doc.data().concert,
//               count: doc.data().count,
//               course: doc.data().course,
//               discharges: doc.data().discharges,
//               disgrace: doc.data().disgrace,
//               email: doc.data().email,
//               equipment: doc.data().equipment,
//               exchange: doc.data().exchange,
//               id: doc.data().id,
//               lateness: doc.data().lateness,
//               lvl: doc.data().lvl,
//               missed: doc.data().missed,
//               name: doc.data().name,
//               responsible: doc.data().responsible,
//               uid: doc.data().uid,
//             });
//           }
//         })})
//       });
//       return response.json(students);
//     })
//     .catch((err) => {
//       console.error(err);
//       return response.status(500).json({ error: err.code });
//     });
// });



//обслуживание html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



app.listen(port, () => console.log(`Listening on port ${port}`));
