import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import "./doctorlist.css";
import Timelist from './times-list'
import Addtime from './add-time-entry-form'
import firebase from "./Firebase"
import DOC from './doctor.svg'
export default class DoctorList extends Component {
    state = {
        data: [],
        show: false,
        _id: null,
        show_pat: "0",
        signedIn: false,
        name: null,
        uid: null,
    };
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }

    handlemodal = () => {
        this.setState({
            show: true
        })
    }
    handleClose = () => {
        this.setState({
            show: false
        })
    }

    find = () => {
        firebase.database().ref().child('data').set({
            data1: 0,
            id: null
        })
        // this.props.history.push({
        //     pathname: '/sfe',
        //     state: { new_id: "arpit" }
        // })
        setTimeout(this.props.history.push({
            pathname: '/sfe',
            state: { new_id: this.state._id }
        }), 5000);
    }

    patient = () => {

        firebase.database().ref('doctor').child(this.state.uid).update({
            doctorID:this.state.uid,
             type:"doctor"
        })

        firebase.database().ref('doctor').child(this.state.uid).child('room').on('value', snap => {

            console.log("FireB ", snap.val())
            this.setState({
                _id: snap.val()
            })
        })
        firebase.database().ref('doctor').child(this.state.uid).child('patientID').on('value', snap => {

            console.log("FireP ", snap.val())
            this.setState({
                show_pat: snap.val()
            })
        })

    }

    async componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ signedIn: !!user, name: user.displayName, uid: user.uid })
            console.log("user", user.uid)
            this.patient();

        })
        
    }
    render() {
        console.log(this.state.name)
        return (
            <div className="DOCTOR">
                {this.state.signedIn ? <div>
                    {this.state.show_pat !== "none" ? <div>
                        <nav class="nav_bg">
                            <a class="navbar-brand" href="/"></a>
                        </nav>
                        <div className="mt-2 p-4">
                            <div className="text-success title_suc"><h1>Hello, Dr. {this.state.name}<br></br>Your patient is ready to cured</h1></div><br></br>
                        </div>

                        <div className="p-2 d-flex justify-content-center mt-5">
                            <div class=" mb-3 card_width text-success">
                                <div class="row no-gutters">
                                    <div class="col-md-4">
                                        <img src={DOC} class="card-img" alt="..." />
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            {/* <h5 class="card-title">Card title</h5>   */}
                                            <p class="card-text">"Medicine really matured me as a person because, as a physician, you're obviously dealing with life and death issues… if you can handle that, you can handle anything."</p>
                                            <p class="card-text"><small class="text-muted">― Ken Jeong</small></p>
                                        </div>
                                        <button type="button" class="btn btn-success mt-5" onClick={this.find}>
                                            Let's begin
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> :
                        <div>
                            <nav class="nav_bg">
                                <a class="navbar-brand" href="/"></a>
                            </nav>
                                <div className="m-3 p-4">

                                <div className="text-success title_suc">
                                    <h1>Hello, Dr. {this.state.name}</h1>
                                </div>
                                <br></br>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div class="loaderr"></div>
                            </div>
                            <div className="d-flex justify-content-center font-weight-bold text-success">
                                No patients right now....
                        </div>
                            <div className="d-flex justify-content-center text-center text-success body_suc p-4">
                                <ul class="list-group text-left ">
                                    <li class="list-group-item list">Once a new patient request for service, you will be redirected to join page. </li>
                                    <li class="list-group-item list">You can choose among various call options.</li>
                                    <li class="list-group-item list">While on a call with patient you can suggest him/her with suggestion box given below.</li>
                                </ul>
                            </div>

                        </div>}
                </div> : <div className="p-5">
                        <StyledFirebaseAuth
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
                    </div>}


            </div>
        );
    }
}
