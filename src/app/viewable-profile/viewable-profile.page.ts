import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import { QuestionService } from '../services/infoDesk/question.service';
import { User, Provider } from '../services/createUsers/create-user.service';

@Component({
  selector: 'app-viewable-profile',
  templateUrl: './viewable-profile.page.html',
  styleUrls: ['./viewable-profile.page.scss'],
})
export class ViewableProfilePage implements OnInit {

  user: User = {
    code: '',
    username: '',
    email: '',
    dueMonth: '',
    weeksPregnant: 0,
    location: 0,
    cohort: '',
    bio: '',
    points: 0,
    securityQ: '',
    securityA: '',
    joined: '',
    currentEmotion: '',
    profilePic: '',
    daysSinceLogin: 0,
    codeEntered: true,
    notes: ''
  };

  provider: Provider = {
    code: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profilePic: '',
    dob: '',
    bio: '',
    type: '',
    providerType: '',
    codeEntered: true,
    notes: ''
  };

  public userProfileID: any;
  public currentPost: any;
  public userType: string;

  constructor(public afs: AngularFirestore, public activatedRoute: ActivatedRoute, public questionService: QuestionService,
              public router: Router, public storage: Storage) {
  }

  ngOnInit() {
    this.storage.get('authenticated').then((val) => {
      if (val === 'false') {
        this.router.navigate(['/login/']);
      }
    });


    this.storage.get('currentPost').then((val) => {
      if (val) {
        this.currentPost = val;
      }
    });

    this.userProfileID = this.activatedRoute.snapshot.paramMap.get('id');

    let ref = this.afs.firestore.collection('users');
    ref.where('code', '==', this.userProfileID)
        .get().then(snapshot => {
      if (snapshot.docs.length > 0) {
        const userRef = ref.where('code', '==', this.userProfileID);
        userRef.get().then((result) => {
          result.forEach(doc => {
            this.userType = 'user';
            this.user.username = doc.get('username');
            console.log(this.user.username);
            this.user.weeksPregnant = doc.get('weeksPregnant');
            this.user.bio = doc.get('bio');
            this.user.cohort = doc.get('cohort');
            this.user.currentEmotion = doc.get('mood');
            this.user.profilePic = doc.get('profilePic');
          });
        });
      } else {
        ref = this.afs.firestore.collection('providers');
        ref.where('code', '==', this.userProfileID)
            .get().then(snap => {
          if (snap.docs.length > 0) {
            const userRef = ref.where('code', '==', this.userProfileID);
            userRef.get().then((result) => {
              result.forEach(doc => {
                this.userType = 'provider';
                this.provider.username = doc.get('username');
                this.provider.bio = doc.get('bio');
                this.provider.profilePic = doc.get('profilePic');
              });
            });
          }
        });
      }
    });
  }

  ionViewWillEnter() {

  }

  goBackToPost() {
    this.router.navigate(['/forum/forum-thread', this.currentPost]);
  }
}
