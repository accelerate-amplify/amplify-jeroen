import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {API} from 'aws-amplify';
import {Vegetable} from '../types/vegetable';

const apiName = 'vegetableShopJeroen'; // replace with the name of your API
const path = '/vegetables'; // replace with the name of the path of your resource

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
 public title = 'Vegetable Shop Jeroen';
 public createForm: FormGroup;
 public submitForm: () => void;

 // declare list of items to populate
 vegetables: Array<Vegetable>;

 constructor(private fb: FormBuilder) {
 }

 public async ngOnInit(): Promise<void> {
   this.createForm = this.fb.group({
     name: ['', Validators.required],
     description: ['', Validators.required],
     city: ['', Validators.required]
   });

   this.fetchData(); // Fetch data on init
 }
 public async onSubmit(vegetable: Vegetable): Promise<void> {
   try {
    const response = await API.post(apiName, path, {body: vegetable});
    console.log('Added vegetable successfully: ' + JSON.stringify(response));
    this.fetchData(); // Fetch data again after posting
   } catch (error) {
    console.error(error);
   } finally {
    this.createForm.reset();
   }
 }

 // New function to fetch data
 private async fetchData(): Promise<void> {
   try {
     this.vegetables = await API.get(apiName, path, {});
   } catch (error) {
     console.error(error);
   }
 }
}


