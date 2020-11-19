import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import {UserService} from './user.service'
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  notify:string;
  searchId:number;
  formData:any = {};
  userForm:FormGroup;
  users:User[];
  errors:any = [];
  constructor(private userService:UserService, private fb:FormBuilder, private router:Router,private route:ActivatedRoute) { }
  flag:number=0;
  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      const key1 = 'saved';
      const key2 = 'deleted';
      const key3 = 'updated';
      if (params[key1] === 'success') {
        this.notify = 'User saved';
      }
      if (params[key2] === 'success') {
        this.notify = 'User deleted';
      }
      if (params[key3] === 'success') {
        this.notify = 'User updated';
      }
    });
  }

  initForm(): void {
    this.userForm = this.fb.group({
      _id: ['', [Validators.required]],
      username: ['', [Validators.required]]
    });
  }
  isValidInput(fieldName): boolean {
    return this.userForm.controls[fieldName].invalid &&
      (this.userForm.controls[fieldName].dirty || this.userForm.controls[fieldName].touched);
  }

  getUsers():void{
    
    this.userService.getUsers().subscribe(result => {
      this.users = result;
      console.log(this.users);
      this.flag=1;
    })
  }

  getForm():void{
    this.flag=2;
  }
  updateForm(id,username, email, password, role){
    this.formData._id=id;
    this.formData.username=username;
    this.formData.email=email;
    this.formData.password=password;
    this.formData.role=role;
    this.flag=3;
  }

  addUser():void{
    console.log(this.formData)
    this.userService.addUser(this.formData)
      .subscribe(() => {
        this.router.navigate(['/user'], { queryParams: { saved: 'success' } });
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
    this.formData = {};
    }
  getUserByUsername():void{
    console.log(this.formData)
    this.userService.getUserByUsername(this.formData).subscribe(result => {
      this.users = [result];
      console.log(this.users);
      this.flag=1;
      this.formData = {}
    });
  }
  updateUserById(id):void{
    this.userService.updateUserById(this.formData,this.formData._id).subscribe(() => {
      this.router.navigate(['/user'], { queryParams: { updated: 'success' } });
    },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      });
    this.formData={};
  }

  deleteUserById(id):void{
    // console.log(id);
    this.flag=0;
    this.userService.deleteUserById(id).subscribe(() => {
      this.router.navigate(['/user'], { queryParams: { deleted: 'success' } });
    },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      });
  }

}
