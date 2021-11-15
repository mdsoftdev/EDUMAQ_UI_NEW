import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MasterService} from '../master.service';
import { Itemcategory } from '../models/itemcategory';
import { Itemgroup } from '../models/itemgroup';
declare var $: any;

@Component({
  selector: 'app-itemcategory',
  templateUrl: './itemcategory.component.html',
  styleUrls: ['./itemcategory.component.css']
})
export class ItemcategoryComponent implements OnInit {

  itemcategoryForm: FormGroup;
  itemGroups: Itemgroup[] = [];
  itemcategories: Itemcategory[] = [];
  itemcategoriesFilteredList: Itemcategory[] = [];
  submitted = false;
  searchText: string;

  constructor(public settingsService: MasterService,
    public fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ListItemCategories();
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
  ListItemCategories() {
    this.settingsService.getAllItemCategories().subscribe((data: Itemcategory[]) => {
      console.log('Categories');
      console.log(data);
      this.itemcategoriesFilteredList = this.itemcategories = data;
    });
} 
getItemGroups() {
  this.settingsService.getAllItemgroups().subscribe((data: Itemgroup[]) => {
    // console.log(data);
    this.itemGroups = data;
  });
} 

onKeyUpEvent(event: any) {
  this.filter(event.target.value);
}

filter(keyword: any) {
  if ( keyword === '') {
    this.itemcategoriesFilteredList = this.itemcategories;
  } else {
  this.itemcategoriesFilteredList = this.itemcategories
                              .filter((itemcategory: Itemcategory) => itemcategory.name.toLocaleLowerCase()
                              .includes(keyword.toLocaleLowerCase()));
  }
}
get totalRows(): number {
  return this.itemcategoriesFilteredList.length;
}

get f() { return this.itemcategoryForm.controls; }
resetForm() {
  this.submitted = false;
  this.itemcategoryForm = this.fb.group({
    itemGroupId: ['',Validators.required],
    id: [0],
    name: ['', Validators.required],
    // startDate: ['', Validators.required],
    // endDate: ['', Validators.required],
    // isCurrentAcademicYear: ['', Validators.required]
    description: [''],
    status:[true]
  }, {
    // validator:  this.validateDate('startDate', 'endDate')
});
}

submitForm() {
  this.submitted = true;
  if (this.itemcategoryForm.invalid) {
    // if (this.f.endDate.errors.mustMatch) {
    //   this.toastr.warning('End date should not less than start date ', 'WARNING!!!', {
    //     timeOut: 3000
    //   });
    // }
    return;
  }
  if (this.itemcategoryForm.get('id').value === 0) {
    
      this.settingsService.createItemcategory(this.itemcategoryForm.value).subscribe(res => {
        this.ListItemCategories();
        this.toastr.success('Records has been sucessfully saved', 'SUCCESS!', {
          timeOut: 3000
        });
        // this.submitted = false;
        // this.itemgroupForm.reset();
        this.resetForm();
      });
    
  } else {
    this.settingsService.updateItemcategory(this.itemcategoryForm.get('id').value, this.itemcategoryForm.value).subscribe(res => {
      console.log('Item Category updated!');
      this.ListItemCategories();
      this.toastr.success('Records has been sucessfully updated', 'SUCCESS!', {
        timeOut: 3000
      });
      // this.submitted = false;
      // this.itemgroupForm.reset();
      this.resetForm();
    });
  }
}

updateForm(id: number) {
  this.settingsService.getItemcategoryById(id).subscribe((data: Itemcategory) => {
    console.log(data);
    this.itemcategoryForm = this.fb.group({
      itemGroupId:[data.itemGroupId],
      id: [data.id],
      name: [data.name, Validators.required],
      description: [data.description],
      status: [data.status]
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
      this.settingsService.deleteItemcategory(id).subscribe(res => {
        Swal.fire(
          'Deleted!',
          'Item Category has been deleted.',
          'success'
        );
        this.ListItemCategories();
      });
    // For more information about handling dismissals please visit
    // https://sweetalert2.github.io/#handling-dismissals
    } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
      'Your imaginary file is safe :)',
      'error'
    );
    }
  });
}
}
