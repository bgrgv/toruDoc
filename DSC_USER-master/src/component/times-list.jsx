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
        suggest:null
    }
    pat = () => {
        firebase.database().ref('patient').child(this.state.uid3).child('suggest').child('sug').on('value', snap => {
            console.log("FireB ", snap.val())
            this.setState({
                suggest: snap.val()
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


