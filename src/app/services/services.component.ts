import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../models/company';
import {CompanyService} from './company.service'
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  notify:string;
  counter=1;
  // updateCompany:Company;
  searchId:number;
  formData:any = {};
  companyForm:FormGroup;
  companies:Company[];
  errors:any = [];
  constructor(private companyService:CompanyService, private fb:FormBuilder, private router:Router,private route:ActivatedRoute) { }
  flag:number=0;
  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      const key1 = 'saved';
      const key2 = 'deleted';
      const key3 = 'updated';
      if (params[key1] === 'success') {
        this.notify = 'Company saved';
      }
      if (params[key2] === 'success') {
        this.notify = 'Company deleted';
      }
      if (params[key3] === 'success') {
        this.notify = 'Company updated';
      }
    });
  }

  initForm(): void {
    this.companyForm = this.fb.group({
      _id: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }
  isValidInput(fieldName): boolean {
    return this.companyForm.controls[fieldName].invalid &&
      (this.companyForm.controls[fieldName].dirty || this.companyForm.controls[fieldName].touched);
  }

  getCompanies():void{
    
    this.companyService.getCompanies().subscribe(result => {
      this.companies = result;
      console.log(this.companies);
      this.flag=1;
    })
  }

  getForm():void{
    this.flag=2;
  }
  updateForm(id,name){
    this.formData._id=id;
    this.formData.name=name;
    this.flag=3;
  }

  addCompany():void{
    console.log(this.formData)
    this.companyService.addCompany(this.formData)
      .subscribe(() => {
        this.router.navigate(['/services'], { queryParams: { saved: 'success' } });
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
    }
  getCompanyById():void{
    // console.log(this.searchId)
    this.companyService.getCompanyById(this.searchId).subscribe(result => {
      this.companies = [result];
      console.log(this.companies);
      this.flag=1;
    });
  }
  updateCompanyById(id):void{
    this.companyService.updateCompanyById(this.formData,this.formData._id).subscribe(() => {
      this.router.navigate(['/services'], { queryParams: { updated: 'success' } });
    },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      });
  }

  deleteCompanyById(id):void{
    // console.log(id);
    this.flag=0;
    this.companyService.deleteCompanyById(id).subscribe(() => {
      this.router.navigate(['/services'], { queryParams: { deleted: 'success' } });
    },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      });
  }

}
