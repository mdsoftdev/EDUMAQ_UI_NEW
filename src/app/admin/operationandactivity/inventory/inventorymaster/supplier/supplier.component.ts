import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MasterService} from '../master.service';
import { Supplier } from '../models/supplier';
import { SupplierType } from '../models/supplierType';
import { Country } from '../models/country';
import { State } from '../models/state';
import { City } from '../models/city';
declare var $: any;

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  supplierForm: FormGroup;
  suppliers: Supplier[] = [];
  supplierTypes: SupplierType[] = [];
  countries: Country[] = [];
  states: State[] = [];
  cities: City[] = [];
  suppliersFilteredList: Supplier[] = [];
  statesFilteredList: State[] = [];
  citiesFilteredList: City[] = [];
  submitted = false;
  searchText: string;
  // startDate: string;
  // endDate: string;

  constructor(public settingsService: MasterService,
    public fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  
    this.ListSuppliers();
    this.ListCountries();
    this.ListStates();
    this.ListCities();
    
      
    this.supplierForm = this.fb.group({
      id: [0],
      supplierType:[null, Validators.required],
      code: [null, Validators.required],
      supplierName:['', Validators.required],
      panNo:[''],
      tanNo:[''],
      gstNo: [''],
      contactNo: [''],
      email: [''],
      website:[''],
      countryId: [null],
      stateId: [null],
      cityId: [null],
      address:[''],
      accountName:[''],
      accountNumber:[''],
      ifscCode:[''],
      bankName:[''],
      status: [null]
    }, {
      // validator:  this.validateDate('startDate', 'endDate')
  });
  }
  ListSuppliers() {
    this.settingsService.getAllSupplier().subscribe((data: Supplier[]) => {
      console.log(data);
      this.suppliersFilteredList = this.suppliers = data;
    });
  }
  ListCountries() {
    this.settingsService.getAllCountries().subscribe((data: Country[]) => {
      console.log(data);
      this.countries = data;
    });
  }
  ListStates() {
    this.settingsService.getAllStates().subscribe((data: State[]) => {
      console.log(data);
      this.states =  data;
    });
  }
  ListCities() {
    this.settingsService.getAllCities().subscribe((data: City[]) => {
      console.log(data);
      this.cities = data;
    });
  }
onKeyUpEvent(event: any) {
  this.filter(event.target.value);
}

filter(keyword: any) {
  if ( keyword === '') {
    this.suppliersFilteredList = this.suppliers;
  } else {
  this.suppliersFilteredList = this.suppliers
                              .filter((type: Supplier) => type.supplierName.toLocaleLowerCase()
                              .includes(keyword.toLocaleLowerCase()));
  }
}
get totalRows(): number {
  return this.suppliersFilteredList.length;
}
get f() { return this.supplierForm.controls; }
resetForm() {
  this.submitted = false;
  this.supplierForm = this.fb.group({
      id: [0],
      supplierType:[null, Validators.required],
      code: [null, Validators.required],
      supplierName:['', Validators.required],
      panNo:[''],
      tanNo:[''],
      gstNo: [''],
      contactNo: [''],
      email: [''],
      website:[''],
      countryId: [null],
      stateId: [null],
      cityId: [null],
      address:[''],
      accountName:[''],
      accountNumber:[''],
      ifscCode:[''],
      bankName:[''],
      status: [null]
  }, {
    // validator:  this.validateDate('startDate', 'endDate')
});
}

submitForm() {
  this.submitted = true;
  if (this.supplierForm.invalid) {
    // if (this.f.endDate.errors.mustMatch) {
    //   this.toastr.warning('End date should not less than start date ', 'WARNING!!!', {
    //     timeOut: 3000
    //   });
    // }
    return;
  }
  if (this.supplierForm.get('id').value === 0) {
    
      this.settingsService.createSupplier(this.supplierForm.value).subscribe(res => {
        this.ListSuppliers();
        this.toastr.success('Records has been sucessfully saved', 'SUCCESS!', {
          timeOut: 3000
        });
        // this.submitted = false;
        // this.itemgroupForm.reset();
        this.resetForm();
      });
    
  } else {
    this.settingsService.updateSupplier(this.supplierForm.get('id').value, this.supplierForm.value).subscribe(res => {
      console.log('Updated!');
      this.ListSuppliers();
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
    this.settingsService.getSupplierById(id).subscribe((data: Supplier) => {
      console.log(data);
      this.supplierForm = this.fb.group({
        id: [0],
        supplierType:[null, Validators.required],
        code: [null, Validators.required],
        supplierName:['', Validators.required],
        panNo:[''],
        tanNo:[''],
        gstNo: [''],
        contactNo: [''],
        email: [''],
        website:[''],
        countryId: [null],
        stateId: [null],
        cityId: [null],
        address:[''],
        accountName:[''],
        accountNumber:[''],
        ifscCode:[''],
        bankName:[''],
        status: [null]
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
        this.settingsService.deleteSupplier(id).subscribe(res => {
          Swal.fire(
            'Deleted!',
            'Supplier has been deleted.',
            'success'
          );
          this.ListSuppliers();
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
