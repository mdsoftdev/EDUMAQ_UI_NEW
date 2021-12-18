import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../inventorymaster/master.service';
import { Item } from '../inventorymaster/models/item';
import { GrnPurchase } from '../inventorymaster/models/grnPurchase';
import { GrnPurchaseItem } from '../inventorymaster/models/grnPurchaseItem';
import { Supplier } from '../inventorymaster/models/supplier';
import { PurchaseOrder } from '../inventorymaster/models/purchaseOrder';
import { Color } from '../inventorymaster/models/color';
import { PurchaseOrderItem } from '../inventorymaster/models/purchaseOrderItem';
declare var $: any;

@Component({
  selector: 'app-grnPurchase',
  templateUrl: './grnPurchase.component.html',
  styleUrls: ['./grnPurchase.component.css']
})
export class GrnPurchaseComponent implements OnInit {

  defaultZero: number = 0;
  defaultTax: number = 18;
  grnPurchaseForm: FormGroup;
  grnPurchases: GrnPurchase[] = [];
  grnPurchasesFilteredList: GrnPurchase[] = [];
  purchaseOrders: PurchaseOrder[] = [];
  purchaseOrdersFilteredList: PurchaseOrder[] = [];
  items: Item[] = [];
  grnPurchaseItems: GrnPurchaseItem[] = [{id:0,grnPurchaseId:0,itemId:0,itemCode:"",quantity:1,discount:null,rate:null, itemName:null,tax:18,total:null,}];
  submitted = false;
  
  suppliers: Supplier[] = [];
  suppliersFilteredList: Supplier[] = [];
  supplierSearchKeyword: string = "supplierName";
  isSupplierSelected: boolean = false;
  selectedSupplier: any = {};
  supplierPlaceholder: any;
  totalBill: any = {};
  selectedPO: any;
  colors: Color[];
  
  constructor(public settingsService: MasterService,
    public fb: FormBuilder,
    private toastr: ToastrService) { }

  get f() { return this.grnPurchaseForm.controls; }
  ngOnInit(): void {
    this.getGrnNo();
    this.GetSuppliers();
    this.getNonCopletePO(0);
    this.GetColors(this, this.GetItems);

    $('#invoiceDate').datepicker().on('changeDate', (e) => {
      // var dateParts = this.formatDate(e.date).split('-');
      this.grnPurchaseForm.get('invoiceDate').patchValue(e.date);
      });
  
      $('#grnDate').datepicker().on('changeDate', (e) => {
        // var dateParts = this.formatDate(e.date).split('-');
        this.grnPurchaseForm.get('grnDate').patchValue(e.date);
      });

    this.grnPurchaseForm = this.fb.group({
        id: [0],
        status:[true],
        branchId : [0],
        supplierId : [0, Validators.required],
        poNumber : [0, Validators.required],
        supplierInvoiceNo : [0, Validators.required],
        invoiceDate : ['', Validators.required],
        grnNumber : [0, Validators.required],
        grnDate : [this.formatDate(new Date()), Validators.required],
        remark : [''],
        internalNote : ['']
      }, {
        validator:  this.validateDate('invoiceDate', 'grnDate')
    });

    // $('#invoiceDate').datepicker('update', this.formatDate(new Date()));
    $('#grnDate').datepicker('update', this.formatDate(new Date()));
  }

  resetForm() {
    this.submitted = false;
    this.grnPurchaseForm = this.fb.group({
      id: [0],
      status:[true],
      branchId : [0],
      supplierId : [0, Validators.required],
      poNumber : [0, Validators.required],
      supplierInvoiceNo : [0, Validators.required],
      invoiceDate : ['', Validators.required],
      grnNumber : [0, Validators.required],
      grnDate : [this.formatDate(new Date()), Validators.required],
      remark : [''],
      internalNote : ['']
    }, {
      validator:  this.validateDate('invoiceDate', 'grnDate')
  });

    //
    this.getGrnNo();
    // reset supplier
    this.selectedSupplier = {};
    this.isSupplierSelected = false;
    this.supplierPlaceholder = null;

    // reset date
    $('#invoiceDate').datepicker('update', this.formatDate(new Date()));
    $('#grnDate').datepicker('update', this.formatDate(new Date()));

    // reset order item
    this.grnPurchaseItems = [{id:0,grnPurchaseId:0,itemId:0,itemCode:"",quantity:1,discount:null,rate:null, itemName:null,tax:18,total:null,}];

    // reset total payable
    this.totalBill = {};

  }

  submitForm() {
    this.submitted = true;
    if (this.grnPurchaseForm.invalid || !this.grnPurchaseItems || !this.selectedSupplier) {
      // if (this.f.endDate.errors.mustMatch) {
      //   this.toastr.warning('End date should not less than start date ', 'WARNING!!!', {
      //     timeOut: 3000
      //   });
      // }
      return;
    }
    
    let compInstance = this;
    const { id  } = this.grnPurchaseForm.value;

    // setup request data
    var grnPurchase:GrnPurchase = this.grnPurchaseForm.value;
    grnPurchase.subTotal = this.totalBill.subTotal;
    grnPurchase.tax = this.totalBill.tax;
    grnPurchase.discount = this.totalBill.discount;
    grnPurchase.additionalCharges = this.totalBill.additionalCharges;
    grnPurchase.totalPayable = this.totalBill.totalPayable;
    grnPurchase.grnDate = this.formatDate(grnPurchase.grnDate);
    grnPurchase.invoiceDate = this.formatDate(grnPurchase.invoiceDate);


    if (id === 0) {
      this.settingsService.createGrnPurchase(this.grnPurchaseForm.value).subscribe(cpores => {
        compInstance.grnPurchaseItems.forEach(a => a.grnPurchaseId = cpores.id);
        compInstance.settingsService.createUpdateGrnPurchaseItems(id,compInstance.grnPurchaseItems).subscribe(cupoires => {
          compInstance.resetViewData(compInstance,'Records has been sucessfully updated')
          });
      });
    } else {
      this.settingsService.updateGrnPurchase(id, this.grnPurchaseForm.value).subscribe(cpores => {
        compInstance.grnPurchaseItems.forEach(a => a.grnPurchaseId = cpores.id);
        compInstance.settingsService.createUpdateGrnPurchaseItems(id,compInstance.grnPurchaseItems).subscribe(cupoires => {
          compInstance.resetViewData(compInstance,'Records has been sucessfully updated')
          });
      });
    }
  }

  GetGrnPurchases() {
    this.settingsService.getAllGrnPurchases().subscribe((data: GrnPurchase[]) => {
      this.grnPurchasesFilteredList = this.grnPurchases = data;
    });
  }

  getGrnNo() {
    this.settingsService.getGrnNo().subscribe((data: number) => {
      this.grnPurchaseForm.get('grnNumber').patchValue(data);
    });
  }

  GetSuppliers() {
    this.settingsService.getAllSupplier().subscribe((data: Supplier[]) => {
      this.suppliersFilteredList = this.suppliers = data;
    });
  }

  getNonCopletePO(supplierId: number = 0) {
    this.settingsService.getNonCopletePO(supplierId).subscribe((data: PurchaseOrder[]) => {
      data.forEach(element => {
        element.displayName = '' + element.purchaseOrderNumber;
      });
      data.unshift({id : 0, branchId : 0, status : true, supplierId : 0, quotationNo : 0, quotationDate : '',
        purchaseOrderNumber : 0, purchaseOrderDate : '', remark : '', internalNote: '', subTotal : 0,
        discount : 0, tax : 0, totalPayable : 0, displayName: 'Without PO'});

      this.purchaseOrders = this.purchaseOrdersFilteredList = data;
    });
  }

  // items start
  GetItems(instance) {
    instance.settingsService.getAllItems().subscribe((data: Item[]) => {
      instance.items = instance.generateItemName(data);
    });
  }

  generateItemName(itemList:Item[]){
    for (var index in itemList) {
      let color = this.colors.find(c => c.id === itemList[index].colorId);
      itemList[index].customName = itemList[index].itemName + '_' + itemList[index].size + '_' + color.value; 
    }

    return itemList;
  }

  onGrnPurchaseItemsSelect(index){
    let parentScope = this;
    const { id } = this.grnPurchaseForm.value;
    const selectedbdItem = this.items.filter(function (itm) { return itm.id == parentScope.grnPurchaseItems[index].itemId });
    this.grnPurchaseItems[index].grnPurchaseId =  id;
    this.grnPurchaseItems[index].itemId =  selectedbdItem[0].id;
    this.grnPurchaseItems[index].itemCode =  selectedbdItem[0].itemCode;
    this.grnPurchaseItems[index].rate =  selectedbdItem[0].saleRate;
  }

  onPurchaseOrderSelect(){
    if(isNaN(this.selectedPO)){
      this.suppliersFilteredList = this.suppliers;
      return;
    }
    var poNumber = parseInt(this.selectedPO);
    if(poNumber === 0){
      this.suppliersFilteredList = this.suppliers;
      return;
    }

    var purchaseOrder = this.purchaseOrders.find(p => p.purchaseOrderNumber === poNumber);
    
    this.suppliersFilteredList = this.suppliers.filter(sup => {
      return purchaseOrder.supplierId === sup.id;
    });

    this.settingsService.getPurchaseOrderItemsById(purchaseOrder.id).subscribe((data: PurchaseOrderItem[]) => {
      this.grnPurchaseItems = [];
      for (var i =0; i < data.length; i++) {
        this.grnPurchaseItems.push({
          id:0,
          grnPurchaseId:0,
          itemId:data[i].itemId,
          itemCode:data[i].itemCode,
          quantity:data[i].quantity,
          discount:data[i].discount,
          rate:data[i].rate,
          itemName:data[i].itemName,
          tax:18,
          total:data[i].total
        })
      }
    });
  }

  calculateItemTotal(poItemIndex){
    let sum = this.grnPurchaseItems[poItemIndex].rate * this.grnPurchaseItems[poItemIndex].quantity;
    let sumAfterDiscount = sum - this.grnPurchaseItems[poItemIndex].discount;
    let tax = (sumAfterDiscount * this.grnPurchaseItems[poItemIndex].tax)/100;
    this.grnPurchaseItems[poItemIndex].total = sumAfterDiscount + tax;

    this.generateTotalBill();
  }

  addNewGrnPurchasetem(){
    this.grnPurchaseItems.push({id:0,grnPurchaseId:0,itemId:0,itemCode:"",quantity:1,discount:null,rate:null, itemName:null,tax:18,total:null,});
  }
  
  removeGrnPurchaseItems(index){
    if (index > -1 && this.grnPurchaseItems.length > 1) {
      this.grnPurchaseItems.splice(index, 1);
    }
  }

  // items end

  GetColors(instance, callback) {
    this.settingsService.getAllColors().subscribe((data: Color[]) => {
      callback(instance);
      this.colors = data;
    });
  }

  // auto complete start
  selectEvent(supplier) {
    this.isSupplierSelected = true;
    this.selectedSupplier = supplier;
    this.grnPurchaseForm.get('supplierId').patchValue(supplier.id);
    this.purchaseOrdersFilteredList = this.purchaseOrders.filter( po => po.supplierId === supplier.id);
  }

  inputCleared(val: string){
    this.isSupplierSelected = false;
    this.selectedSupplier = {};
    this.grnPurchaseForm.get('supplierId').patchValue(this.defaultZero);
    this.purchaseOrdersFilteredList = this.purchaseOrders;
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
  
      // set error on matchingControl if validation fails
      if (Date.parse(control.value) > Date.parse(matchingControl.value)) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
    };
  }

  generateTotalBill(){
    let compInstance = this;
    this.totalBill.subTotal = 0;
    this.totalBill.discount = 0;
    this.totalBill.tax = 0;
    this.grnPurchaseItems.forEach(a => {
      compInstance.totalBill.subTotal += (a.quantity * a.rate);
      compInstance.totalBill.discount += a.discount;
    });

    let payableAmount = this.totalBill.subTotal - this.totalBill.discount;
    this.totalBill.tax = (payableAmount * this.defaultTax )/100;
    this.totalBill.tax = this.totalBill.tax.toFixed(2)
    this.totalBill.totalPayable = payableAmount + parseFloat(this.totalBill.tax);
    this.totalBill.totalPayable = this.totalBill.totalPayable + ( this.totalBill.additionalCharges ? + this.totalBill.additionalCharges : 0);
    this.totalBill.totalPayable = this.totalBill.totalPayable.toFixed(2)
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

  private resetViewData(componentInstance, message){
    componentInstance.GetItems(componentInstance);
        componentInstance.toastr.success(message, 'SUCCESS!', {
          timeOut: 3000
        });
        componentInstance.resetForm();
  }

}
