import React, { Component } from "react";
import firebase from "./Firebase"
// import 'firebase/firestore';
import "./add-time-entry-form.css"
import { Button } from "react-bootstrap";



// const AddTimeEntryForm = () => {
//     const [title, setTitle] = useState("");

//     function onSubmit(e) {
//         e.preventDefault();

//         firebase
//             .firestore()
//             .collection("times")
//             .add({
//                 title
//             })
//             .then(() => {
//                 setTitle("");
//             });
//     }

class AddTimeEntryForm extends Component {
    state={
        uid2:null,
        puid:null
    }
    componentDidMount() {
       
    firebase.auth().onAuthStateChanged(user => {
            this.setState({  uid2: user.uid })
            console.log("user", user.uid)
            this.getdata();
        })
    }

    getdata = () => {
        firebase.database().ref('doctor').child(this.state.uid2).child('patientID').on('value', snap => {

            console.log("FireB ", snap.val())
            this.setState({
                puid: snap.val()
            })
        })
    }

    onSubmit = (e) => {
    e.preventDefault();
    const sug = e.target.email.value
    firebase.database().ref('patient').child(this.state.puid).child('suggest').update({
        sug
    })
    firebase.database().ref('doctor').child(this.state.uid2).child('suggest').update({
        sug
    })

    }

    render() {
        return (
        <div className="suggest p-2">
            <form onSubmit={this.onSubmit}>
                <h4 className="mt- mb-2">Suggestions</h4>
                <h4 className="mt- mb-2">Advice to patient</h4>
                <div className="mt- mb-2">
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Address" ref="email" name="email" required="required"/>

                </div>
                <Button variant="success" type="submit" className="mt- mb-2">Make Suggestion</Button>
            </form>
        </div>
        );
    }
}
//     return (
//         <div className="suggest p-2">
//             <form onSubmit={onSubmit}>
//                 <h4 className="mt- mb-2">Suggestions</h4>
//                 <h4 className="mt- mb-2">Advice to patient</h4>
//                 <div className="mt- mb-2">
//                     <input
//                         type="text"
//                         value={title}
//                         onChange={(e) => setTitle(e.currentTarget.value)}
//                         className="form-control w-75" id="exampleFormControlInput1" placeholder="Type your suggestions"
//                     />
//                 </div>
//                 <Button variant="success" type="submit" className="mt- mb-2">Make Suggestion</Button>
//             </form>
//         </div>
//     );
// };

export default AddTimeEntryForm;

// import React, { useState } from "react";

// import firebase from "./Firebase";

// const AddTimeEntryForm = () => {
//     const [title, setTitle] = useState("");

//     function onSubmit(e) {
//         e.preventDefault();

//         firebase
//             .firestore()
//             .collection("times")
//             .add({
//                 title
//             })
//             .then(() => {
//                 setTitle("");
//             });
//     }

//     return (
//         <div className="suggest p-2">
//             <form onSubmit={onSubmit}>
//                 <h4>Suggestions</h4>
//                 <h4 className="mt- mb-2">Suggestions</h4>
//                 <h4 className="mt- mb-2">Advice to patient</h4>
//                 <div>
//                     <label>Type your suggestion to patient</label>
//                     <input
//                         type="text"
//                         value={title}
//                         onChange={(e) => setTitle(e.currentTarget.value)}
//                     // lassName="form-control w-75" id="exampleFormControlInput1" placeholder="Type your suggestions"
//                     />
//                 </div>
//                 <Button variant="success" type="submit" className="mt- mb-2">Make Suggestion</Button>
//             </form>
//         </div>
//     );
// };

// export default AddTimeEntryForm;
