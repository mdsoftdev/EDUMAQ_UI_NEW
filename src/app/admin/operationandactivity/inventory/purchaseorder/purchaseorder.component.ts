import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../inventorymaster/master.service';
import { Color } from '../inventorymaster/models/color';
import { Item } from '../inventorymaster/models/item';
import { PurchaseOrder } from '../inventorymaster/models/purchaseOrder';
import { PurchaseOrderItem } from '../inventorymaster/models/purchaseOrderItem';
import { Supplier } from '../inventorymaster/models/supplier';
declare var $: any;

@Component({
  selector: 'app-purchaseorder',
  templateUrl: './purchaseorder.component.html',
  styleUrls: ['./purchaseorder.component.css']
})
export class PurchaseorderComponent implements OnInit {

  defaultZero: number = 0;
  defaultTax: number = 18;
  purchaseOrderForm: FormGroup;
  purchaseOrders: PurchaseOrder[] = [];
  purchaseOrdersFilteredList: PurchaseOrder[] = [];
  items: Item[] = [];
  purchaseOrderItems: PurchaseOrderItem[] = [{id:0,purchaseOrderId:0,itemId:0,itemCode:"",quantity:1,discount:null,rate:null, itemName:null,tax:18,total:null}];
  submitted = false;
  
  suppliers: Supplier[] = [];
  suppliersFilteredList: Supplier[] = [];
  supplierSearchKeyword: string = "supplierName";
  isSupplierSelected: boolean = false;
  selectedSupplier: any = {};
  supplierPlaceholder: any;
  totalBill: any = {};
  colors: Color[];
  
  constructor(public settingsService: MasterService,
    public fb: FormBuilder,
    private toastr: ToastrService) { }

  get f() { return this.purchaseOrderForm.controls; }
  ngOnInit(): void {
    this.getPOQuotNoAndPoNo();
    this.GetSuppliers();
    this.GetColors(this, this.GetItems);

    $('#quotationDate').datepicker().on('changeDate', (e) => {
      // var dateParts = this.formatDate(e.date).split('-');
      this.purchaseOrderForm.get('quotationDate').patchValue(e.date);
      });
  
      $('#purchaseOrderDate').datepicker().on('changeDate', (e) => {
        // var dateParts = this.formatDate(e.date).split('-');
        this.purchaseOrderForm.get('purchaseOrderDate').patchValue(e.date);
      });

    this.purchaseOrderForm = this.fb.group({
        id: [0],
        status:[true],
        branchId : [0],
        supplierId : [0, Validators.required],
        quotationNo : [0, Validators.required],
        quotationDate : [this.formatDate(new Date()), Validators.required],
        purchaseOrderNumber : [0, Validators.required],
        purchaseOrderDate : [this.formatDate(new Date()), Validators.required],
        remark : [''],
        internalNote : ['']
      }, {
        validator:  this.validateDate('quotationDate', 'purchaseOrderDate')
    });

    $('#quotationDate').datepicker('update', this.formatDate(new Date()));
    $('#purchaseOrderDate').datepicker('update', this.formatDate(new Date()));
  }

  resetForm() {
    this.submitted = false;
    this.purchaseOrderForm = this.fb.group({
        id: [0],
        status:[true],
        branchId : [0],
        supplierId : [0, Validators.required],
        quotationNo : [0, Validators.required],
        quotationDate : [this.formatDate(new Date()), Validators.required],
        purchaseOrderNumber : [0, Validators.required],
        purchaseOrderDate : [this.formatDate(new Date()), Validators.required],
        remark : [''],
        internalNote : ['']
      }, {
        validator:  this.validateDate('quotationDate', 'purchaseOrderDate')
    });

    //
    this.getPOQuotNoAndPoNo();
    // reset supplier
    this.selectedSupplier = {};
    this.isSupplierSelected = false;
    this.supplierPlaceholder = null;

    // reset date
    $('#quotationDate').datepicker('update', this.formatDate(new Date()));
    $('#purchaseOrderDate').datepicker('update', this.formatDate(new Date()));

    // reset order item
    this.purchaseOrderItems = [{id:0,purchaseOrderId:0,itemId:0,itemCode:"",quantity:1,discount:null,rate:null, itemName:null,tax:18,total:null,}];

    // reset total payable
    this.totalBill = {};

  }

  submitForm() {
    console.log(this.purchaseOrderForm.value);
    this.submitted = true;
    if (this.purchaseOrderForm.invalid || !this.purchaseOrderItems || !this.selectedSupplier) {
      // if (this.f.endDate.errors.mustMatch) {
      //   this.toastr.warning('End date should not less than start date ', 'WARNING!!!', {
      //     timeOut: 3000
      //   });
      // }
      return;
    }
    
    let compInstance = this;
    const { id  } = this.purchaseOrderForm.value;

    // setup request data
    var purchaseOrder:PurchaseOrder = this.purchaseOrderForm.value;
    purchaseOrder.subTotal = this.totalBill.subTotal;
    purchaseOrder.tax = this.totalBill.tax;
    purchaseOrder.discount = this.totalBill.discount;
    purchaseOrder.totalPayable = this.totalBill.totalPayable;
    purchaseOrder.quotationDate = this.formatDate(purchaseOrder.quotationDate);
    purchaseOrder.purchaseOrderDate = this.formatDate(purchaseOrder.purchaseOrderDate);


    if (id === 0) {
      this.settingsService.createPurchaseOrder(this.purchaseOrderForm.value).subscribe(cpores => {
        compInstance.purchaseOrderItems.forEach(a => a.purchaseOrderId = cpores.id);
        compInstance.settingsService.createUpdatePurchaseOrderItems(id,compInstance.purchaseOrderItems).subscribe(cupoires => {
          compInstance.resetViewData(compInstance,'Records has been sucessfully updated')
          });
      });
    } else {
      this.settingsService.updatePurchaseOrder(id, this.purchaseOrderForm.value).subscribe(cpores => {
        compInstance.purchaseOrderItems.forEach(a => a.purchaseOrderId = cpores.id);
        compInstance.settingsService.createUpdatePurchaseOrderItems(id,compInstance.purchaseOrderItems).subscribe(cupoires => {
          compInstance.resetViewData(compInstance,'Records has been sucessfully updated')
          });
      });
    }
  }

  GetPurchaseOrders() {
    this.settingsService.getAllPurchaseOrders().subscribe((data: PurchaseOrder[]) => {
      this.purchaseOrdersFilteredList = this.purchaseOrders = data;
    });
  }

  getPOQuotNoAndPoNo() {
    this.settingsService.getPOQuotNoAndPoNo().subscribe((data: number) => {
      var quoatPoNoStr = ''
      if(data < 10){
        quoatPoNoStr = '000'
      } else if(data < 100){
        quoatPoNoStr = '00'
      } else if (data < 1000){
        quoatPoNoStr = '0'
      };
      quoatPoNoStr += data;
      this.purchaseOrderForm.get('quotationNo').patchValue(quoatPoNoStr);
      this.purchaseOrderForm.get('purchaseOrderNumber').patchValue(quoatPoNoStr);
    });
  }

  GetSuppliers() {
    this.settingsService.getAllSupplier().subscribe((data: Supplier[]) => {
      console.log(data);
      this.suppliersFilteredList = this.suppliers = data;
    });
  }

  // items start
  GetItems(instance) {
    instance.settingsService.getAllItems().subscribe((data: Item[]) => {
      instance.items = instance.generateItemName(data);
    });
  }

  GetColors(instance, callback) {
    this.settingsService.getAllColors().subscribe((data: Color[]) => {
      callback(instance);
      this.colors = data;
    });
  }

  generateItemName(itemList:Item[]){
    for (var index in itemList) {
      let color = this.colors.find(c => c.id === itemList[index].colorId);
      itemList[index].customName = itemList[index].itemName + '_' + itemList[index].size + '_' + color.value; 
    }

    return itemList;
  }

  onPurchaseOrderItemsSelect(index){
    let parentScope = this;
    const { id } = this.purchaseOrderForm.value;
    const selectedbdItem = this.items.filter(function (itm) { return itm.id == parentScope.purchaseOrderItems[index].itemId });
    this.purchaseOrderItems[index].purchaseOrderId =  id;
    this.purchaseOrderItems[index].itemId =  selectedbdItem[0].id;
    this.purchaseOrderItems[index].itemCode =  selectedbdItem[0].itemCode;
    this.purchaseOrderItems[index].rate =  selectedbdItem[0].saleRate;
  }

  calculateItemTotal(poItemIndex){
    let sum = this.purchaseOrderItems[poItemIndex].rate * this.purchaseOrderItems[poItemIndex].quantity;
    let sumAfterDiscount = sum - this.purchaseOrderItems[poItemIndex].discount;
    let tax = (sumAfterDiscount * this.purchaseOrderItems[poItemIndex].tax)/100;
    this.purchaseOrderItems[poItemIndex].total = sumAfterDiscount + tax;

    this.generateTotalBill();
  }

  addNewPurchaseOrdertem(){
    this.purchaseOrderItems.push({id:0,purchaseOrderId:0,itemId:0,itemCode:"",quantity:1,discount:null,rate:null, itemName:null,tax:18,total:null,});
  }
  
  removePurchaseOrderItems(index){
    if (index > -1 && this.purchaseOrderItems.length > 1) {
      this.purchaseOrderItems.splice(index, 1);
    }
  }

  // items end

  // auto complete start
  selectEvent(suplier) {
    this.isSupplierSelected = true;
    this.selectedSupplier = suplier;
    this.purchaseOrderForm.get('supplierId').patchValue(suplier.id);
  }

  inputCleared(val: string){
    this.isSupplierSelected = false;
    this.selectedSupplier = {};
    this.purchaseOrderForm.get('supplierId').patchValue(this.defaultZero);
  }
  // auto complete end

  validateDate(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
  
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
  
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }
  
      console.log(Date.parse(control.value));
      console.log(Date.parse(matchingControl.value));
      // set error on matchingControl if validation fails
      if (Date.parse(control.value) > Date.parse(matchingControl.value)) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
    };
  }

  private formatDate(date) {
    const d = new Date(date);
    if(isNaN(d.getTime())){
      return date;
    }
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {month = '0' + month; }
    if (day.length < 2) {day = '0' + day; }
    return [day, month, year].join('-');
  }

  private generateTotalBill(){
    let compInstance = this;
    this.totalBill.subTotal = 0;
    this.totalBill.discount = 0;
    this.totalBill.tax = 0;
    this.purchaseOrderItems.forEach(a => {
      compInstance.totalBill.subTotal += (a.quantity * a.rate);
      compInstance.totalBill.discount += a.discount;
    });

    let payableAmount = this.totalBill.subTotal - this.totalBill.discount;
    this.totalBill.tax = (payableAmount * this.defaultTax )/100;
    this.totalBill.tax = this.totalBill.tax.toFixed(2)
    this.totalBill.totalPayable = payableAmount + parseFloat(this.totalBill.tax);
    this.totalBill.totalPayable = this.totalBill.totalPayable.toFixed(2)
  }

  private resetViewData(componentInstance, message){
    componentInstance.GetItems(componentInstance);
        componentInstance.toastr.success(message, 'SUCCESS!', {
          timeOut: 3000
        });
        componentInstance.resetForm();
  }

}
