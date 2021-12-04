import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../master.service';
import { Item } from '../models/item';
import { Itemcategory } from '../models/itemcategory';
import { Itemgroup } from '../models/itemgroup';
import { Unit } from '../models/unit';
import { Color } from '../models/color';
import { Tax } from '../models/tax';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-itemcreation',
  templateUrl: './itemcreation.component.html',
  styleUrls: ['./itemcreation.component.css']
})
export class ItemcreationComponent implements OnInit {

  itemcreationForm: FormGroup;
  items: Item[] = [];
  itemFilteredList: Item[] = [];
  itemGroups: Itemgroup[] = [];
  itemCategories: Itemcategory[] = [];
  units: Unit[] = [];
  colors: Color[] = [];
  taxes: Tax[] = [];
  submitted = false;
  searchText: string;
  
  constructor(public settingsService: MasterService,
    public fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetItems();
    this.GetitemCategories();
    this.getItemGroups();
    this.getUnits();
    this.getColors();
    this.getTaxes();
    this.itemcreationForm = this.fb.group({
      itemGroupId: ['',Validators.required],
      itemCategoryId: ['',Validators.required],
      id: [0],
      itemName: ['', Validators.required],
      itemCode: ['', Validators.required],
      sku: [''],
      unitId: ['', Validators.required],
      size: [''],
      colorId: [''],
      openingStock: [''],
      taxId: [''],
      cost: [''],
      saleRate:[''],
      lowQtyAlert: [''],
      isBundledProject: [false],
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

  GetitemCategories() {
    this.settingsService.getAllItemCategories().subscribe((data: Itemcategory[]) => {
      this.itemCategories = data;
    });
  }

  getItemGroups() {
    this.settingsService.getAllItemgroups().subscribe((data: Itemgroup[]) => {
      this.itemGroups = data;
    });
  }

  getUnits() {
    this.settingsService.getAllUnits().subscribe((data: Unit[]) => {
      // console.log(data);
      this.units = data;
    });
  } 
  
  getColors() {
    this.settingsService.getAllColors().subscribe((data: Color[]) => {
      // console.log(data);
      this.colors = data;
    });
  }
  
  getTaxes() {
    this.settingsService.getAllTax().subscribe((data: Tax[]) => {
      // console.log(data);
      this.taxes = data;
    });
  }

  get f() { return this.itemcreationForm.controls; }
resetForm() {
  this.submitted = false;
  this.itemcreationForm = this.fb.group({
    itemGroupId: ['',Validators.required],
      itemCategoryId: ['',Validators.required],
      id: [0],
      itemName: ['', Validators.required],
      itemCode: ['', Validators.required],
      sku: [''],
      unitId: ['', Validators.required],
      size: [''],
      colorId: [''],
      openingStock: [''],
      taxId: [''],
      cost: [''],
      saleRate:[''],
      lowQtyAlert: [''],
      isBundledProject: [false],
      description: [''],
      status:[true]
  }, {
    // validator:  this.validateDate('startDate', 'endDate')
});
}

submitForm() {
  this.submitted = true;
  if (this.itemcreationForm.invalid) {
    // if (this.f.endDate.errors.mustMatch) {
    //   this.toastr.warning('End date should not less than start date ', 'WARNING!!!', {
    //     timeOut: 3000
    //   });
    // }
    return;
  }
  if (this.itemcreationForm.get('id').value === 0) {
    
      this.settingsService.createItem(this.itemcreationForm.value).subscribe(res => {
        this.GetItems();
        this.toastr.success('Records has been sucessfully saved', 'SUCCESS!', {
          timeOut: 3000
        });
        this.resetForm();
      });
    
  } else {
    this.settingsService.updateItem(this.itemcreationForm.get('id').value, this.itemcreationForm.value).subscribe(res => {
      this.GetItems();
      this.toastr.success('Records has been sucessfully updated', 'SUCCESS!', {
        timeOut: 3000
      });
      this.resetForm();
    });
  }
}

updateForm(id: number) {
  this.settingsService.getItemById(id).subscribe((data: Item) => {
    this.itemcreationForm = this.fb.group({
      itemGroupId:[data.itemGroupId,Validators.required],
      itemCategoryId: [data.itemCategoryId,Validators.required],
      id: [data.id],
      itemName: [data.itemName, Validators.required],
      itemCode: [data.itemCode, Validators.required],
      sku: [data.sku],
      unitId: [data.unitId, Validators.required],
      size: [data.size],
      colorId: [data.colorId],
      openingStock: [data.openingStock],
      taxId: [data.taxId],
      cost: [data.cost],
      saleRate:[data.saleRate],
      lowQtyAlert: [data.lowQtyAlert],
      isBundledProject: [data.isBundledProject],
      description: [data.description],
      status:[data.status]
    }, {
      // validator:  this.validateDate('startDate', 'endDate')
  });
  });

}

deleteForm(id: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      this.settingsService.deleteItem(id).subscribe(res => {
        Swal.fire(
          'Deleted!',
          'Item has been deleted.',
          'success'
        );
        this.GetItems();
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
      'Your data is safe :)',
      'error'
    );
    }
  });
}

}
