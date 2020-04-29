import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import "./doctorlist.css";
import Timelist from './times-list'
import Addtime from './add-time-entry-form'
import firebase from "./Firebase"
import DOC from './patient.svg'
export default class DoctorList extends Component {
    state = {
        data: [],
        show: false,
        signedIn: false,
        name: null,
        uuid: null,
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
        // firebase.database().ref().child('data').set({
        //     data1: 1,
        //     id: "arpit"
        // })
        // firebase.database().ref().child('uniqueUserID').update({
        //     userID: this.state.uuid,
        //     type: "patient"
        // })
        // firebase.database().ref().child('uniqueDoctorID').update({
        //     patientID:this.state.uuid,
        //     room:this.state.uuid
        // })

        const ss = firebase.database().ref('patient').child(this.state.uuid).push({
            sessionComplete: 0
        })

        const curr = ss.key
        firebase.database().ref('patient').child(this.state.uuid).update({
        current: curr
        })

        // this.props.history.push({
        //     pathname: '/sfe',
        //     state: { new_id: "arpit" }
        // })
        this.props.history.push({
            pathname: '/sfe',
            state: { new_id: curr }
        })
    }

    async componentDidMount(e) {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ signedIn: !!user, name: user.displayName, uuid: user.uid })
            console.log("user", user.uid)
        })
    }
    render() {
        return (
            <div className="DOCTOR">
                {this.state.signedIn ? <div>
                    <nav class="nav_bg">
                        <a class="navbar-brand" href="/"></a>
                    </nav>
                    <div>

                        <div class="modall fade" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-scrollable" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalScrollableTitle">Modal title</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <Timelist />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="m-3">
                        <div className="text-success title_suc"><h1>Hello, {this.state.name}</h1></div><br></br>
                        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModalScrollable">
                            Previous suggestion
                    </button>
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
                                    <p class="card-text">"The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.."</p>
                                     <p class="card-text"><small class="text-muted">― Hellen Keller</small></p>
                                    </div>
                                    <button type="button" class="btn btn-success mt-5" onClick={this.find}>
                                        Find Doctor
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div> : <div className="p-5">
                        <StyledFirebaseAuth
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
                    </div>}

                {/* <div className="d-flex justify-content-center">
                    <button type="button" class="btn btn-success mt-5" onClick={this.find}>
                        Find Doctor
                </button>
                </div> */}
            </div>
        );
    }
}
