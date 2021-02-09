const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");

require("dotenv").config({ path: __dirname + "/variables.env" });

const sound_pass = process.env.SOUNDCOLOR_PASS;
const google = JSON.parse(process.env.GOOGLE);
const admin = require("firebase-admin");
const serviceAccount = google;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
//const firebase = require("firebase");

const bodyParser = require("body-parser");
const { request, response } = require("express");
const { get } = require("http");
const { Console } = require("console");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));


let listOfPreEvents = []
let lastId 
let studentsLastId 

const getLastId = () => {
  let last = 0;
  db.collection("eventsCalendar")
  .get()
  .then((data) => {
    data.forEach((doc) => {
      let id = parseInt(doc.data().id)
      if(id > last){
       last = id
      }
    })
    //console.log(last)
    return lastId = last + 1
    
  })
}

const StudentGetLastId = () => {
  let last = 0;
  db.collection("students")
  .get()
  .then((data) => {
    data.forEach((doc) => {
      let id = parseInt(doc.data().id)
      if(id > last){
       last = id
      }
    })
    //console.log(last)
    return studentsLastId = last + 1
    
  })
}

getLastId()
StudentGetLastId()

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
          meetPlace: doc.data().meetPlace,
          meetDateAndTime: doc.data().meetDateAndTime && doc.data().meetDateAndTime.toDate(),
          id: doc.data().id,
          eventPlace: doc.data().eventPlace,
          eventDateAndTime: doc.data().eventDateAndTime && doc.data().eventDateAndTime.toDate(),
          equipment: doc.data().equipment,
          description: doc.data().description,
          cloth: doc.data().cloth,
          cast: doc.data().cast,
          status: doc.data().status,
          createdDate: doc.data().createdDate,
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
app.get("/api/createEvent", (request, response) => {
  let event = JSON.parse(request.query.event);
  let createdDate = new Date()
  console.log(event)
  getLastId()
  console.log(lastId)
  db.collection("eventsCalendar")
    .doc(String(lastId))
    .set({
      id: String(lastId),
      title: event.title,
      members: [],
      meetDateAndTime: new Date(event.meetDateAndTime),
      meetPlace:  event.meetPlace,
      description:  event.description || "",
      typeOfEvent:  event.typeOfEvent,
      equipment: [],
      cloth:  event.cloth,
      eventDateAndTime: new Date(event.eventDateAndTime),
      eventPlace:  event.eventPlace,
      cast:  event.cast,
      max: event.max,
      status: "Подготовка",
      createdDate: createdDate
    })
    .then(() => {
      console.log("Удачно")
      op.push(new Timerio(2, String(lastId), createdDate));
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
});

//=================получить event по ID=============//
app.get("/api/getEventByID", (request, response) => {
  let id = String(JSON.parse(request.query.id));
  //console.log(id)
  db.collection("eventsCalendar")
    .doc(id)
    .get()
    .then((data) => {
      //let members = data.data().members
      //var membersList = []
      // if (members != null) {
      //   one  = members.forEach(member => {
      //     db.collection("students")
      //       .doc(String(member.id))
      //       .get()
      //       .then((datu) => {
      //         //console.log(datu.data().name, datu.data().uid, datu.data().email, member.senior)
      //          var one = {
      //           name: datu.data().name,
      //           uid: datu.data().uid, 
      //           email: datu.data().email, 
      //           senior: member.senior,
      //         }
      //         //console.log(one)
      //         membersList.push(one)
      //         return one
      //       })
      //   });
        
       
      //   console.log(membersList)
      // }


      let event = {
        id: data.data().id,
        typeOfEvent: data.data().typeOfEvent,
        cloth: data.data().cloth,
        members:  data.data().members,
        description: data.data().description,
        cast: data.data().cast,
        eventPlace: data.data().eventPlace,
        eventTime: data.data().eventTime,
        max: data.data().max,
        meetDate: data.data().meetDate,
        title: data.data().title,
        equipment: data.data().equipment,
        meetPlace: data.data().meetPlace,
        eventDate: data.data().eventDate,
        meetTime: data.data().meetTime,
      }

      //console.log(data.data())
      return response.json(event);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
});

//оборудование
app.get("/api/addEquip", (req, res) => {
  let id = String(JSON.parse(req.query.id));
  let equipment = JSON.parse(req.query.equipment);
  console.log(id, "___________", equipment);

  db.collection("eventsCalendar")
    .doc(id)
    .update({
      equipment: equipment,
    })
    .then(console.log("Удачно"))
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
});

//====================обновление members in event================//
app.get("/api/newListOfMembersInEvent", (request, response) => {
  let eventMembers = JSON.parse(request.query.eventMembers);
  let id = String(JSON.parse(request.query.id));
  db.collection("eventsCalendar")
    .doc(id)
    .update({
      members: eventMembers,
    })
    .then(console.log("Удачно"))
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
});

app.get("/api/createStudent", (request, response) => {
  let student = JSON.parse(request.query.student);
  id = studentsLastId
  console.log(id)
  // admin.auth().createUser({
  //   email: student.email,
  //   password: student.password,
  //   displayName: student.name,
  // })
  //     .then(function (result) {
  //       //console.log(result)
  //       uid = result.uid
  //       console.log(uid)
  //     })
  //     uid &&
      db.collection("students")
        .doc(String(id))
        .set({
          email: student.email,
          password: student.password,
          name: student.name,
          lateness: student.lateness || 0,
          lvl: student.lvl || 0,
          missed: student.missed || 0,
          disgrace: student.disgrace || 0,
          responsible: student.responsible || 0,
          concert: student.concert || 0,
          equipment: student.equipment || 0,
          count: student.count || 0,
          course: student.course || 0,
          discharges: student.discharges || 0,
          exchange: student.exchange || 0,
          //uid: uid,
          id: id,
        })
        .then(function () {
          let str = "success"
          return response.json(str)
        })
        .catch((err) => {
          console.error(err);
          return response.status(500).json({ error: err.code });
        })
})


const rule = new schedule.RecurrenceRule();

let op = [];

function onServerStartEvents() {
  let events = [];
  db.collection("eventsCalendar")
    .where("status", "==", "Подготовка")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        events.push({
          id: doc.id,
          date: doc.data().createdDate && doc.data().createdDate.toDate()
        });
      });
    })
    .then(() => {
      listOfPreEvents = events;
      listOfPreEvents.forEach((event) => {
        console.log(event)
        op.push(new Timerio(2, event.id, event.date));
        console.log(op)
      })
      
    });
}
onServerStartEvents(); 



function Timerio(onDay, doc, createDate) {
  let one = createDate
  let two = new Date(one.setDate(one.getDate() + onDay))
  let year = two.getFullYear()
  let month = two.getMonth() 
  let day = two.getDate() 
  let hour = two.getHours() || 12
  let minu = two.getMinutes() || 0
   
  rule.year = year;
  rule.month = month;
  rule.date = day;
  rule.hour = hour;
  rule.minute = minu;
  
  console.log(rule)
  schedule.scheduleJob(rule, function () {
    let members;
    let suc = false;

    db.collection("eventsCalendar")
      .doc(String(doc))
      .get()
      .then((data) => {
        if (data.data().status == "Подготовка" && data.data().members.length > 0) {
          let max = data.data().members.length;
          let min = 1;
          members = data.data().members;
          let succesor = Math.floor(Math.random() * (max - min + 1)) + min;
          members[succesor - 1].senior = true;
          suc = true;
          console.log(members)
        }
      })
     .then(() => {
      if (suc == true && members) {
        db.collection("eventsCalendar")
          .doc(String(doc))
          .update({
            members: members,
            status: "Готовность",
          })
          .then(
            console.log(
              "Готовность и отвественный для мероприятия ",
              doc,
              " выставленны."
            )
         );
      }
     })
  });
}





























//TO-DO получить last id students

app.get("/api/time", (request, response) => {
  let id = request.query.id;
  console.log(id);
  const rocks = (id) => {
    console.log(id + " rocks");
  };
  setTimeout(rocks, id, "Node.js");
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
