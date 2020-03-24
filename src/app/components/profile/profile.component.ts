import { Component, OnInit } from '@angular/core';
import { PostjobService } from 'src/app/services/postjob.service';
import { ProfileService } from 'src/app/services/profile.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: String;user;expForm;editForm;exp;submitted1: boolean;location: string;submitted2: boolean; isEmployer: String;resume: string;

  // tslint:disable-next-line:max-line-length
  constructor(private jobService: PostjobService, private profService: ProfileService, private fb: FormBuilder, private modalService: NgbModal, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (sessionStorage.getItem('isLoggedIn')) {
      this.userId = sessionStorage.getItem('userId')
      this.isEmployer = sessionStorage.getItem('isEmployer')
      this.getProfile().then(result => {
         //debugger
        this.initExpForm();
        this.initEditForm();
      });
    } else {
      this.router.navigateByUrl('login');
    }
  }

  initExpForm() {
    this.expForm = this.fb.group({
      company: ['', [Validators.required]],
      position: ['', [Validators.required]],
      description: ['', [Validators.required]],
      from: ['', []],
      to: ['', []],
      userId: [this.userId, [Validators.required]],
      stillWorking: ['']
    });
  }

  initEditForm() {
    this.editForm = this.fb.group({
      location: [this.location, [Validators.required]],
      userName: [sessionStorage.getItem('userName'), [Validators.required]],
      userId: [this.userId, [Validators.required]]
    });
  }

  get f() {
    return this.expForm.controls;
  }

  get f2() {
    return this.editForm.controls;
  }

  formatDate(d) {
    return moment(d).format('DD MMM YYYY')
  }

  getProfile() {
    return new Promise((resolve, reject) => {
      this.profService.getProfile(this.userId).subscribe(data => {
        if(data['errno']) {
          console.log(data)
          return
        }
        //debugger
        this.user = data
        this.location = ''

        if(data[0]) {
          this.location = data[0]['location']
          this.resume =  data[0]['resume']
        }
        resolve()
      },
      error => {
        console.log(error);
      })
    })
  }

  getPdfUrl(target) {
    //debugger
    this.sanitizer.bypassSecurityTrustResourceUrl(this.resume);
    target.href = this.resume;
  }

  openFileExp() {
    document.getElementById('add-dp').click();
  }

  openFileExpResume() {
    document.getElementById('add-resume').click();
  }

  openModal(content) {
    this.modalService.open(content, {size: 'lg'})
  }

  onFileChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    var imageSrc = reader.result;
    document.getElementById('dp').setAttribute('src', imageSrc)
    this.saveDp(imageSrc, this.userId)
  }

  /* onFileChange2(e) {
    //Read File
    var selectedFile = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    debugger
    //Check File is not Empty
    if (selectedFile.length > 0) {
        // Select the very first file from list
        var fileToLoad = selectedFile[0];
        // FileReader function for read the file.
        var fileReader = new FileReader();
        var base64;
        // Onload of file read the file content
        fileReader.onload = function(fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            // Print data in console
            debugger
            console.log(base64);
        };
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);
    }
  } */

  onFileChange2(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded2.bind(this);
    reader.readAsDataURL(file);
  }
  
  _handleReaderLoaded2(e) {
    let reader = e.target;
    var imageSrc = reader.result;
    this.saveResume(imageSrc, this.userId);
  }

  saveResume(resume, userId) {
    var profileData = {
      "resume": resume,
      "userId": userId
    }
    this.profService.saveResume(profileData).subscribe(data => {
      document.getElementById('resumeBtn').click();
    },
    error => {
      console.log(error)
    })
  }

  saveDp(imageSrc, userId) {
    var profileData = {
      "imageSrc": imageSrc,
      "userId": userId
    }
    this.profService.saveProfile(profileData).subscribe(data => {

    },
    error => {
      console.log(error)
    })
  }

  saveExp() {
    
    this.submitted1 = true
    //if(this.expForm.valid) {
      var from1 = this.expForm.value.from;
      var to1 = this.expForm.value.to;

      this.expForm.value.from = from1.year + '-' + (from1.month < 10 ? '0' + from1.month : from1.month) + '-' + (from1.day < 10 ? '0' + from1.day : from1.day)
      if(to1)
        this.expForm.value.to = to1.year + '-' + (to1.month < 10 ? '0' + to1.month : to1.month) + '-' + (to1.day < 10 ? '0' + to1.day : to1.day)
      //else
        //this.expForm.value.to = ''
      
      this.profService.addExp(this.expForm.value).subscribe(result => {
        if(result['errno']) {
          return;
        }
        else {
          this.getProfile()
          //document.getElementById('closeModal').click()
        }
      },
      error => {
        console.log(error)
      })
    /* }
    else {
      return;
    } */
  }

  edit() {
    this.submitted2 = true
    if(this.editForm.valid) {
      this.profService.editProfile(this.editForm.value).subscribe(result => {
        if(result['errno']) {
          return;
        }
        else {
          this.getProfile()
          sessionStorage.setItem('userName', this.editForm.value['userName'])
          location.reload()
          document.getElementById('closeModal2').click()
        }
      },
      error => {
        console.log(error)
      })
    }
  }
}
