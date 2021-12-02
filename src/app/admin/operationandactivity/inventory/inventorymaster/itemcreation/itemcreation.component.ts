import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../master.service';
import { Item } from '../models/item';
import { Itemcategory } from '../models/itemcategory';
import { Itemgroup } from '../models/itemgroup';

@Component({
  selector: 'app-itemcreation',
  templateUrl: './itemcreation.component.html',
  styleUrls: ['./itemcreation.component.css']
})
export class ItemcreationComponent implements OnInit {

  itemcategoryForm: FormGroup;
  items: Item[] = [];
  itemFilteredList: Item[] = [];
  itemGroups: Itemgroup[] = [];
  itemcategories: Itemcategory[] = [];
  submitted = false;
  searchText: string;
  
  constructor(public settingsService: MasterService,
    public fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetItems();
    this.GetItemCategories();
    this.getItemGroups();
    this.itemcategoryForm = this.fb.group({
      itemGroupId: ['',Validators.required],
      id: [0],
      name: ['', Validators.required],
      description: [''],
      status:[true]
    }, {
      // validator:  this.validateDate('startDate', 'endDate')
  });
  }

  GetItems() {
    this.settingsService.getAllItems().subscribe((data: Item[]) => {
      this.itemFilteredList = this.items = data;
    });
  }

  GetItemCategories() {
    this.settingsService.getAllItemCategories().subscribe((data: Itemcategory[]) => {
      this.itemcategories = data;
    });
  }

  getItemGroups() {
    this.settingsService.getAllItemgroups().subscribe((data: Itemgroup[]) => {
      this.itemGroups = data;
    });
  }

}
