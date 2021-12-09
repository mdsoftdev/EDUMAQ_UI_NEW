import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { HttpEventType } from '@angular/common/http';
import { ProductBundle } from '../models/productBundle';

@Component({
  selector: 'app-itemcreation',
  templateUrl: './itemcreation.component.html',
  styleUrls: ['./itemcreation.component.css']
})
export class ItemcreationComponent implements OnInit {

  @ViewChild('file') file: ElementRef;

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
  uploadProgress: number;
  selectedFiles: File[];
  uploadResponse: {imagePath: ''};
  isBundledProductChecked: Boolean;
  productBundles: ProductBundle[] = [{id:0,bundleId:0,itemId:0,code:"",quantity:0, selectedItem:0}];

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
      size: [0],
      colorId: [''],
      openingStock: [0],
      taxId: [''],
      cost: [''],
      saleRate:[0],
      lowQtyAlert: [0],
      isBundledProduct: [false],
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
      size: [0],
      colorId: [''],
      openingStock: [0],
      taxId: [''],
      cost: [''],
      saleRate:[0],
      lowQtyAlert: [0],
      isBundledProduct: [false],
      description: [''],
      status:[true]
    }, {
      // validator:  this.validateDate('startDate', 'endDate')
  });

  // clear image input
  this.file.nativeElement.value = "";
  this.productBundles = [{id:0,bundleId:0,itemId:0,code:"",quantity:0, selectedItem:0}];
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
  this.uploadFile(this.createUpdateItem, this);
}

// createUpdateItem(componentInstance){
//   if (form.get('id').value === 0) {
    
//     this.settingsService.createItem(form.value).subscribe(res => {
//       this.GetItems();
//       this.toastr.success('Records has been sucessfully saved', 'SUCCESS!', {
//         timeOut: 3000
//       });
//       this.resetForm();
//     });
  
// } else {
//   this.settingsService.updateItem(form.get('id').value, form.value).subscribe(res => {
//     this.GetItems();
//     this.toastr.success('Records has been sucessfully updated', 'SUCCESS!', {
//       timeOut: 3000
//     });
//     this.resetForm();
//   });
// }
// }

createUpdateItem(componentInstance){
  let formData = componentInstance.itemcreationForm.value;
  if(componentInstance.uploadResponse && componentInstance.uploadResponse.imagePath){
    formData['image'] = componentInstance.uploadResponse.imagePath;
  }
  const { id, isBundledProduct } = componentInstance.itemcreationForm.value;
  if (componentInstance.itemcreationForm.get('id').value === 0) {
    
    componentInstance.settingsService.createItem(formData).subscribe(res => {
      if(isBundledProduct){
        componentInstance.settingsService.createUpdateProductBundles(id,componentInstance.productBundles).subscribe(res => {
          componentInstance.resetViewData(componentInstance,'Records has been sucessfully updated')
        });
      } else {
        componentInstance.resetViewData(componentInstance,'Records has been sucessfully updated')
      }
    });
} else {
  componentInstance.settingsService.updateItem(componentInstance.itemcreationForm.get('id').value, formData).subscribe(res => {
    if(isBundledProduct){
      componentInstance.settingsService.createUpdateProductBundles(id,componentInstance.productBundles).subscribe(res => {
        componentInstance.resetViewData(componentInstance,'Records has been sucessfully updated')
      });
    } else {
      componentInstance.resetViewData(componentInstance,'Records has been sucessfully updated')
    }
  });
}
}

updateForm(id: number) {
  this.settingsService.getItemById(id).subscribe((data: Item) => {
    if(data && data.isBundledProduct){
      this.settingsService.getProductBundlesById(id).subscribe((bundle: ProductBundle[]) =>{
        this.productBundles = bundle;
      })
    }
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
      isBundledProduct: [data.isBundledProduct],
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

public setUploadFile = (files) => {
  if (files.length === 0) {
    return;
  }
  this.selectedFiles = files;
}

public setImagePath = (event) => {
  this.uploadResponse = event;
}

public uploadFile = (callback, data) => {
  if (!this.selectedFiles || this.selectedFiles.length === 0) {
    if(callback){
      callback(data);
    }
    return;
  }
  this.settingsService.uploadFile(this.selectedFiles)
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.uploadProgress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.setImagePath(event.body);        
      }
    },
    (err) => {
      console.log('err file upload');
    },
    () => {
      console.log('calling item creation');
      if(callback){
        callback(data);
      }
    });
}

resetViewData(componentInstance, message){
  componentInstance.GetItems();
      componentInstance.toastr.success(message, 'SUCCESS!', {
        timeOut: 3000
      });
      componentInstance.resetForm();
}

searchItems(searchString){
  this.itemFilteredList = this.items.filter(x =>
    x.itemName.toLowerCase().indexOf(searchString.trim().toLowerCase()) !== -1 || 
    x.sku.toLowerCase().indexOf(searchString.trim().toLowerCase()) !== -1)
}

// bundled items
addNewBundleItem(){
  this.productBundles.push({id:0,bundleId:0,itemId:0,code:"",quantity:0,selectedItem:0});
}

removeNewBundleItem(index){
  if (index > -1) {
    this.productBundles.splice(index, 1);
  }
}

onBundledItemSelect(index){
  let parentScope = this;
  const { id } = this.itemcreationForm.value;
  const selectedbdItem = this.items.filter(function (itm) { return itm.id == parentScope.productBundles[index].itemId });
  this.productBundles[index].bundleId =  id;
  this.productBundles[index].code =  selectedbdItem[0].itemCode;
}

}
