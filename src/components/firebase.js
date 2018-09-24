import { firebase } from '@firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
	apiKey: "AIzaSyBHp0fbNw2Y9MoNmPB__io7ojCef_BFglc",
    authDomain: "sef-preact.firebaseapp.com",
    databaseURL: "https://sef-preact.firebaseio.com",
    projectId: "sef-preact",
    storageBucket: "sef-preact.appspot.com",
    messagingSenderId: "903317678982"
};
firebase.initializeApp(config);

export default firebase;