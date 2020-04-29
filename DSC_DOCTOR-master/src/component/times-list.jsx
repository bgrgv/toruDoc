// import React, { useState, useEffect } from "react";
//  import firebase from "../Firebase";
// import firebase from "./Firebase"
// import "./add-time-entry-form.css"
import React, { Component } from "react";
import firebase from "./Firebase"
// import 'firebase/firestore';
import "./add-time-entry-form.css"
import { Button } from "react-bootstrap";

// function useTimes() {
//     const [times, setTimes] = useState([]);
//     useEffect(() => {
//         const unsubscribe = firebase
//             .firestore()
//             .collection("times")
//             .onSnapshot((snapshot) => {
//                 const newTimes = snapshot.docs.map((doc) => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }));
//                 setTimes(newTimes);
//             });

//         return () => unsubscribe();
//     });

//     return times;
// }

// const TimesList = () => {
//     const times = useTimes();




class TimesList extends Component {
    state={
        uid3:null,
        suggest:null,
        current:null,
        puid2:null,
        BPDia:null,
                    BPM:    null,
                    BPSys:null,
                    SPO2:null,
                    Temp:null
    }
    pat = () => {
        firebase.database().ref('doctor').child(this.state.uid3).child('suggest').child('sug').on('value', snap => {
            console.log("FireB ", snap.val())
            this.setState({
                suggest: snap.val()
            })
        })
        firebase.database().ref('doctor').child(this.state.uid3).child('patientID').on('value', snap => {

            console.log("FireB ", snap.val())
            this.setState({
                puid2: snap.val()
            })
            this.values();
        })
    }
    values = () => {
        firebase.database().ref('patient').child(this.state.puid2).child('current').on('value', snap => {
            console.log("FireB ", snap.val())
            this.setState({
                current: snap.val()
            })
            this.body();
        })
    }
    body = () => {
        firebase.database().ref('patient').child(this.state.puid2).child(this.state.current).child('data').limitToFirst(1).on("value", (snapshot) => {
            snapshot.forEach((queueData) => {
                console.log("queue" + queueData.val().Temp)
                this.setState({
                    BPDia:queueData.val().BPDia,
                    BPM:queueData.val().BPM,
                    BPSys:queueData.val().BPSys,
                    SPO2:queueData.val().SPO2,
                    Temp:queueData.val().Temp
                })
            })
        })

    }
    async componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
            this.setState({  uid3: user.uid })
            // console.log("user", user.uid)
        this.pat();

        })
    }
    render(){
    return (
        <div>
            <div>
                Patient Vitals:
                BPDia:{this.state.BPDia},
                BPM:{this.state.BPM},
                BPSys:{this.state.BPSys},
                SPO2:{this.state.SPO2},
                Temp:{this.state.Temp}
            </div>
            <h2>Doctor sugesstion</h2>
            <ol>
                {this.state.suggest}
                {/* {times.map((time) => (
                    <li key={time.id}>
                        <div className="time-entry">{time.title}</div>
                    </li>
                ))} */}
            </ol>
        </div>
    );
    }
};

export default TimesList;


