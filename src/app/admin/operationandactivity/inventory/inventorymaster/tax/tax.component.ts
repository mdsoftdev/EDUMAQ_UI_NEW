import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MasterService} from '../master.service';
import { Tax } from '../models/tax';
declare var $: any;

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {

  taxForm: FormGroup;
  taxes: Tax[] = [];
  taxesFilteredList: Tax[] = [];
  submitted = false;
  searchText: string;
  // startDate: string;
  // endDate: string;

  constructor(public settingsService: MasterService,
    public fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  
    this.ListTaxes();
      
    this.taxForm = this.fb.group({
      id: [0],
      taxName: ['', Validators.required],
      description: [''],
      rate: [null, Validators.required],
      rateunit: [''],
      // startDate: ['', Validators.required],
      // endDate: ['', Validators.required],
      // isCurrentAcademicYear: ['', Validators.required]
      status:[true]
    }, {
      // validator:  this.validateDate('startDate', 'endDate')
  });
  }
  ListTaxes() {
    this.settingsService.getAllTax().subscribe((data: Tax[]) => {
      console.log(data);
      this.taxesFilteredList = this.taxes = data;
    });
}
onKeyUpEvent(event: any) {
  this.filter(event.target.value);
}

filter(keyword: any) {
  if ( keyword === '') {
    this.taxesFilteredList = this.taxes;
  } else {
  this.taxesFilteredList = this.taxes
                              .filter((type: Tax) => type.taxName.toLocaleLowerCase()
                              .includes(keyword.toLocaleLowerCase()));
  }
}
get totalRows(): number {
  return this.taxesFilteredList.length;
}
get f() { return this.taxForm.controls; }
resetForm() {
  this.submitted = false;
  this.taxForm = this.fb.group({
    id: [0],
      taxName: ['', Validators.required],
      description: [''],
      rate: [null,Validators.required],
      rateunit: [''],
      // startDate: ['', Validators.required],
      // endDate: ['', Validators.required],
      // isCurrentAcademicYear: ['', Validators.required]
      status:[true]
  }, {
    // validator:  this.validateDate('startDate', 'endDate')
});
}

submitForm() {
  this.submitted = true;
  if (this.taxForm.invalid) {
    // if (this.f.endDate.errors.mustMatch) {
    //   this.toastr.warning('End date should not less than start date ', 'WARNING!!!', {
    //     timeOut: 3000
    //   });
    // }
    return;
  }
  if (this.taxForm.get('id').value === 0) {
    
      this.settingsService.createTax(this.taxForm.value).subscribe(res => {
        this.ListTaxes();
        this.toastr.success('Records has been sucessfully saved', 'SUCCESS!', {
          timeOut: 3000
        });
        // this.submitted = false;
        // this.itemgroupForm.reset();
        this.resetForm();
      });
    
  } else {
    this.settingsService.updateTax(this.taxForm.get('id').value, this.taxForm.value).subscribe(res => {
      console.log('Updated!');
      this.ListTaxes();
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
    this.settingsService.getTaxById(id).subscribe((data: Tax) => {
      console.log(data);
      this.taxForm = this.fb.group({
        id: [data.id],
        taxName: [data.taxName, Validators.required],
        description: [data.description],
        rate: [data.rate,Validators.required],
        rateunit: [data.rateunit],
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
        this.settingsService.deleteTax(id).subscribe(res => {
          Swal.fire(
            'Deleted!',
            'Tax has been deleted.',
            'success'
          );
          this.ListTaxes();
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
