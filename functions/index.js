/* eslint-disable consistent-return */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
var globalRef = admin.database();
exports.addToQueue = functions.database.ref('/patient/{patientID}/current')
    .onWrite((change, context) => {
        // Exit when the data is deleted.
        if (!change.after.exists()) {
            return null;
        }
        const room = change.after.val()
        console.log('Patient ID and Room', context.params.patientID, room);
        if (room === "none")
            return null
        return globalRef.ref("queue").push().set({
            room: room,
            patientID: context.params.patientID
        });
    });

exports.findFreeDoctorAtQueueAdd = functions.database.ref('/queue/{key}')
    .onWrite((change, context) => {
        // Exit when the data is deleted.
        if (!change.after.exists()) {
            return null;
        }
        const data = change.after.val()
        console.log('Patient ID and Room', context.params.key, data.patientID, data.room);
        globalRef.ref("doctor").orderByChild("patientID").equalTo("none").limitToFirst(1).once("value", (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((doctorData) => {
                    globalRef.ref("doctor/" + doctorData.key).update({
                        room: data.room,
                        patientID: data.patientID
                    });
                    globalRef.ref("patient/" + data.patientID + "/" + data.room).update({
                        doctorID: doctorData.key
                    });
                    return globalRef.ref("queue/" + context.params.key).remove();
                });
            } else {
                return null
            }
        });
    });

exports.checkQueue = functions.database.ref('/doctor/{doctorID}/patientID')
    .onWrite((change, context) => {
        // Exit when the data is deleted.
        if (!change.after.exists()) {
            return null;
        }
        const patientID = change.after.val()
        console.log('Doctor ID and Room', context.params.doctorID, patientID);
        if (patientID === "none") {
            globalRef.ref("queue").limitToFirst(1).once("value", (snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach((queueData) => {
                        globalRef.ref("doctor/" + context.params.doctorID).update({
                            room: queueData.val().room,
                            patientID: queueData.val().patientID
                        });
                        globalRef.ref("patient/" + queueData.val().patientID + "/" + queueData.val().room).update({
                            doctorID: context.params.doctorID
                        });
                        return globalRef.ref("queue/" + queueData.key).remove();
                    });
                } else {
                    return null
                }
            });
        } else {
            return null;
        }
    });

exports.addData = functions.https.onRequest((req, res) => {
    var data = req.body.split("$")
    var processed = {}
    data.forEach(element => {
        var values = element.split("_")
        processed[values[0]] = values[1]
    });
    globalRef.ref("patient/" + processed.uid).once("value", (snapshot) => {
        console.log(snapshot.val())
        if (snapshot.exists()) {
            globalRef.ref("patient/" + processed.uid + "/" + snapshot.val().current + "/data").push({
                BPM: processed.BPM,
                SPO2: processed.SPO2,
                BPSys: processed.BPSys,
                BPDia: processed.BPDia,
                Temp: processed.Temp
            });
            res.send("Success")
        } else {
            return null
        }
    });
});