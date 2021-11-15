import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MasterService} from '../master.service';
import { SupplierType } from '../models/supplierType';
declare var $: any;

@Component({
  selector: 'app-suppliertype',
  templateUrl: './suppliertype.component.html',
  styleUrls: ['./suppliertype.component.css']
})
export class SuppliertypeComponent implements OnInit {

  suppliertypeForm: FormGroup;
  suppliertypes: SupplierType[] = [];
  suppliertypeFilteredList: SupplierType[] = [];
  submitted = false;
  searchText: string;
  // startDate: string;
  // endDate: string;

  constructor(public settingsService: MasterService,
    public fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  
      this.ListSupplierType();
      
    this.suppliertypeForm = this.fb.group({
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
  ListSupplierType() {
    this.settingsService.getAllSupplierTypes().subscribe((data: SupplierType[]) => {
      console.log(data);
      this.suppliertypeFilteredList = this.suppliertypes = data;
    });
}
onKeyUpEvent(event: any) {
  this.filter(event.target.value);
}

filter(keyword: any) {
  if ( keyword === '') {
    this.suppliertypeFilteredList = this.suppliertypes;
  } else {
  this.suppliertypeFilteredList = this.suppliertypes
                              .filter((type: SupplierType) => type.name.toLocaleLowerCase()
                              .includes(keyword.toLocaleLowerCase()));
  }
}
get totalRows(): number {
  return this.suppliertypeFilteredList.length;
}
get f() { return this.suppliertypeForm.controls; }
resetForm() {
  this.submitted = false;
  this.suppliertypeForm = this.fb.group({
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
  if (this.suppliertypeForm.invalid) {
    // if (this.f.endDate.errors.mustMatch) {
    //   this.toastr.warning('End date should not less than start date ', 'WARNING!!!', {
    //     timeOut: 3000
    //   });
    // }
    return;
  }
  if (this.suppliertypeForm.get('id').value === 0) {
    
      this.settingsService.createSupplierType(this.suppliertypeForm.value).subscribe(res => {
        this.ListSupplierType();
        this.toastr.success('Records has been sucessfully saved', 'SUCCESS!', {
          timeOut: 3000
        });
        // this.submitted = false;
        // this.itemgroupForm.reset();
        this.resetForm();
      });
    
  } else {
    this.settingsService.updateSupplierType(this.suppliertypeForm.get('id').value, this.suppliertypeForm.value).subscribe(res => {
      console.log('Updated!');
      this.ListSupplierType();
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
    this.settingsService.getSupplierTypeById(id).subscribe((data: SupplierType) => {
      console.log(data);
      this.suppliertypeForm = this.fb.group({
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
        this.settingsService.deleteSupplierType(id).subscribe(res => {
          Swal.fire(
            'Deleted!',
            'Supplier Type has been deleted.',
            'success'
          );
          this.ListSupplierType();
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
