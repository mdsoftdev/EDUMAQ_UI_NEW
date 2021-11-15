import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MasterService} from '../master.service';
import { Itemgroup } from '../models/itemgroup';
declare var $: any;

@Component({
  selector: 'app-itemgroup',
  templateUrl: './itemgroup.component.html',
  styleUrls: ['./itemgroup.component.css']
})
export class ItemgroupComponent implements OnInit {

  itemgroupForm: FormGroup;
  itemgroups: Itemgroup[] = [];
  itemgroupFilteredList: Itemgroup[] = [];
  submitted = false;
  searchText: string;
  // startDate: string;
  // endDate: string;

  constructor(public settingsService: MasterService,
    public fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    // ('#startDate').datepicker().on('changeDate', (e) => {
    //   // var dateParts = this.formatDate(e.date).split('-');
    //   this.academicyearForm.get('startDate').patchValue(e.date);
    //   });
  
    //   $('#endDate').datepicker().on('changeDate', (e) => {
    //     // var dateParts = this.formatDate(e.date).split('-');
    //     this.academicyearForm.get('endDate').patchValue(e.date);
    //   });
  
      this.ListItemGroup();
      
    this.itemgroupForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: [''],
      // startDate: ['', Validators.required],
      // endDate: ['', Validators.required],
      // isCurrentAcademicYear: ['', Validators.required]
      status:[true]
    }, {
      // validator:  this.validateDate('startDate', 'endDate')
  });
  }
  ListItemGroup() {
    this.settingsService.getAllItemgroups().subscribe((data: Itemgroup[]) => {
      console.log(data);
      this.itemgroupFilteredList = this.itemgroups = data;
    });
}
onKeyUpEvent(event: any) {
  this.filter(event.target.value);
}

filter(keyword: any) {
  if ( keyword === '') {
    this.itemgroupFilteredList = this.itemgroups;
  } else {
  this.itemgroupFilteredList = this.itemgroups
                              .filter((itemgroup: Itemgroup) => itemgroup.name.toLocaleLowerCase()
                              .includes(keyword.toLocaleLowerCase()));
  }
}
get totalRows(): number {
  return this.itemgroupFilteredList.length;
}
get f() { return this.itemgroupForm.controls; }
resetForm() {
  this.submitted = false;
  this.itemgroupForm = this.fb.group({
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
  if (this.itemgroupForm.invalid) {
    // if (this.f.endDate.errors.mustMatch) {
    //   this.toastr.warning('End date should not less than start date ', 'WARNING!!!', {
    //     timeOut: 3000
    //   });
    // }
    return;
  }
  if (this.itemgroupForm.get('id').value === 0) {
    
      this.settingsService.createItemgroup(this.itemgroupForm.value).subscribe(res => {
        this.ListItemGroup();
        this.toastr.success('Records has been sucessfully saved', 'SUCCESS!', {
          timeOut: 3000
        });
        // this.submitted = false;
        // this.itemgroupForm.reset();
        this.resetForm();
      });
    
  } else {
    this.settingsService.updateItemgroup(this.itemgroupForm.get('id').value, this.itemgroupForm.value).subscribe(res => {
      console.log('Item Group updated!');
      this.ListItemGroup();
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
    this.settingsService.getItemgroupById(id).subscribe((data: Itemgroup) => {
      console.log(data);
      this.itemgroupForm = this.fb.group({
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
        this.settingsService.deleteItemgroup(id).subscribe(res => {
          Swal.fire(
            'Deleted!',
            'Item Group has been deleted.',
            'success'
          );
          this.ListItemGroup();
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
