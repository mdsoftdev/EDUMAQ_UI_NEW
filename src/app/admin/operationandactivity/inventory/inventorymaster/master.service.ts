import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import {  throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Itemgroup } from './models/itemgroup';
import { Itemcategory } from './models/itemcategory';
import { SupplierType } from './models/supplierType';
import { Tax } from './models/tax';
import { Supplier } from './models/supplier';
import { Country } from './models/country';
import { State } from './models/state';
import { City } from './models/city';
import { Item } from './models/item';
import { Unit } from './models/unit';
import { Color } from './models/color';
import { ProductBundle } from './models/productBundle';
import { PurchaseOrder } from './models/purchaseOrder';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }
    // ItemGroup start
  getAllItemgroups(): Observable<Itemgroup[]>{
      return this.httpClient.get<Itemgroup[]>(environment.apiUrl + '/itemgroups/')
      .pipe(
        catchError(this.errorHandler)
      );
  }
  
  getItemgroupById(id): Observable<Itemgroup> {
      return this.httpClient.get<Itemgroup>(environment.apiUrl + '/itemgroups/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }
    
  createItemgroup(itemgroup): Observable<Itemgroup> {
    return this.httpClient.post<Itemgroup>(environment.apiUrl + '/itemgroups/', JSON.stringify(itemgroup), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  
  updateItemgroup(id, itemgroup): Observable<Itemgroup> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put<Itemgroup>(environment.apiUrl + '/itemgroups/' + id, JSON.stringify(itemgroup), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  
  deleteItemgroup(id) {
    return this.httpClient.delete<Itemgroup>(environment.apiUrl + '/itemgroups/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getAllItemCategories(): Observable<Itemcategory[]>{
    return this.httpClient.get<Itemcategory[]>(environment.apiUrl + '/itemcategories/')
    .pipe(
      catchError(this.errorHandler)
    );
}

getItemcategoryById(id): Observable<Itemcategory> {
    return this.httpClient.get<Itemcategory>(environment.apiUrl + '/itemcategories/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
}
  
createItemcategory(itemcategory): Observable<Itemcategory> {
  return this.httpClient.post<Itemcategory>(environment.apiUrl + '/itemcategories/', JSON.stringify(itemcategory), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  );
}

updateItemcategory(id, itemcategory): Observable<Itemcategory> {
  // tslint:disable-next-line:max-line-length
  return this.httpClient.put<Itemcategory>(environment.apiUrl + '/itemcategories/' + id, JSON.stringify(itemcategory), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  );
}

deleteItemcategory(id) {
  return this.httpClient.delete<Itemcategory>(environment.apiUrl + '/itemcategories/' + id)
  .pipe(
    catchError(this.errorHandler)
  );
}


getAllSupplierTypes(): Observable<SupplierType[]>{
  return this.httpClient.get<SupplierType[]>(environment.apiUrl + '/suppliertypes/')
  .pipe(
    catchError(this.errorHandler)
  );
}

getSupplierTypeById(id): Observable<SupplierType> {
  return this.httpClient.get<SupplierType>(environment.apiUrl + '/suppliertypes/' + id)
  .pipe(
    catchError(this.errorHandler)
  );
}

createSupplierType(supplierType): Observable<SupplierType> {
  return this.httpClient.post<SupplierType>(environment.apiUrl + '/suppliertypes/', JSON.stringify(supplierType), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  );
}

updateSupplierType(id, supplierType): Observable<SupplierType> {
  // tslint:disable-next-line:max-line-length
  return this.httpClient.put<SupplierType>(environment.apiUrl + '/suppliertypes/' + id, JSON.stringify(supplierType), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  );
}

deleteSupplierType(id) {
  return this.httpClient.delete<SupplierType>(environment.apiUrl + '/suppliertypes/' + id)
  .pipe(
    catchError(this.errorHandler)
  );
}
getAllTax(): Observable<Tax[]>{
  return this.httpClient.get<Tax[]>(environment.apiUrl + '/taxes/')
  .pipe(
    catchError(this.errorHandler)
  );
}

getTaxById(id): Observable<Tax> {
  return this.httpClient.get<Tax>(environment.apiUrl + '/taxes/' + id)
  .pipe(
    catchError(this.errorHandler)
  );
}

createTax(tax): Observable<Tax> {
  return this.httpClient.post<Tax>(environment.apiUrl + '/taxes/', JSON.stringify(tax), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  );
}

updateTax(id, tax): Observable<Tax> {
  // tslint:disable-next-line:max-line-length
  return this.httpClient.put<Tax>(environment.apiUrl + '/taxes/' + id, JSON.stringify(tax), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  );
}

deleteTax(id) {
  return this.httpClient.delete<Tax>(environment.apiUrl + '/taxes/' + id)
  .pipe(
    catchError(this.errorHandler)
  );
}

getAllSupplier(): Observable<Supplier[]>{
  return this.httpClient.get<Supplier[]>(environment.apiUrl + '/suppliers/')
  .pipe(
    catchError(this.errorHandler)
  );
}

getSupplierById(id): Observable<Supplier> {
  return this.httpClient.get<Supplier>(environment.apiUrl + '/suppliers/' + id)
  .pipe(
    catchError(this.errorHandler)
  );
}

createSupplier(supplier): Observable<Supplier> {
  return this.httpClient.post<Supplier>(environment.apiUrl + '/suppliers/', JSON.stringify(supplier), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  );
}

updateSupplier(id, supplier): Observable<Supplier> {
  // tslint:disable-next-line:max-line-length
  return this.httpClient.put<Supplier>(environment.apiUrl + '/suppliers/' + id, JSON.stringify(supplier), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  );
}

deleteSupplier(id) {
  return this.httpClient.delete<Supplier>(environment.apiUrl + '/suppliers/' + id)
  .pipe(
    catchError(this.errorHandler)
  );
}

getAllCountries(): Observable<Country[]>{
  return this.httpClient.get<Country[]>(environment.apiUrl + '/countries/')
  .pipe(
    catchError(this.errorHandler)
  );
}

getCountryById(id): Observable<Country> {
  return this.httpClient.get<Country>(environment.apiUrl + '/countries/' + id)
  .pipe(
    catchError(this.errorHandler)
  );
}
getAllStates(): Observable<State[]>{
  return this.httpClient.get<State[]>(environment.apiUrl + '/states/')
  .pipe(
    catchError(this.errorHandler)
  );
}

getStateById(id): Observable<State> {
  return this.httpClient.get<State>(environment.apiUrl + '/states/' + id)
  .pipe(
    catchError(this.errorHandler)
  );
}
getAllCities(): Observable<City[]>{
  return this.httpClient.get<City[]>(environment.apiUrl + '/cities/')
  .pipe(
    catchError(this.errorHandler)
  );
}

getCityById(id): Observable<City> {
  return this.httpClient.get<City>(environment.apiUrl + '/cities/' + id)
  .pipe(
    catchError(this.errorHandler)
  );
}

getAllItems(): Observable<Item[]>{
  return this.httpClient.get<Item[]>(environment.apiUrl + '/items/')
  .pipe(
    catchError(this.errorHandler)
  );
}

getItemById(id): Observable<Item> {
  return this.httpClient.get<Item>(environment.apiUrl + '/items/' + id)
  .pipe(
    catchError(this.errorHandler)
  );
}

createItem(item): Observable<Item> {
  return this.httpClient.post<Item>(environment.apiUrl + '/items/', JSON.stringify(item), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  );
}

updateItem(id, item): Observable<Item> {
  // tslint:disable-next-line:max-line-length
  return this.httpClient.put<Item>(environment.apiUrl + '/items/' + id, JSON.stringify(item), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  );
}

deleteItem(id) {
  return this.httpClient.delete<Item>(environment.apiUrl + '/items/' + id)
  .pipe(
    catchError(this.errorHandler)
  );
}

getAllUnits(): Observable<Unit[]>{
  return this.httpClient.get<Unit[]>(environment.apiUrl + '/units/')
  .pipe(
    catchError(this.errorHandler)
  );
}

getAllColors(): Observable<Color[]>{
  return this.httpClient.get<Color[]>(environment.apiUrl + '/colors/')
  .pipe(
    catchError(this.errorHandler)
  );
}

uploadFile(files) {
  let fileToUpload = <File>files[0];
  const formData = new FormData();
  formData.append('file', fileToUpload, fileToUpload.name);
  return this.httpClient.post<string>(environment.apiUrl + '/upload/image', formData, {reportProgress: true, observe: 'events'})
  .pipe(
    catchError(this.errorHandler)
  );
}

getProductBundlesById(id): Observable<ProductBundle[]>{
  return this.httpClient.get<ProductBundle[]>(environment.apiUrl + '/productbundles/'+id)
  .pipe(
    catchError(this.errorHandler)
  );
}

createUpdateProductBundles(id, bundle): Observable<ProductBundle[]> {
  console.log(JSON.stringify(bundle));
  return this.httpClient.post<ProductBundle[]>(environment.apiUrl + '/productbundles/bulk/' + id, JSON.stringify(bundle), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  );
}

getAllPurchaseOrders(): Observable<PurchaseOrder[]>{
  return this.httpClient.get<PurchaseOrder[]>(environment.apiUrl + '/purchaseOrders/')
  .pipe(
    catchError(this.errorHandler)
  );
}

getPOQuotNoAndPoNo(): Observable<number>{
  return this.httpClient.get<number>(environment.apiUrl + '/purchaseOrders/quotandpo/')
  .pipe(
    catchError(this.errorHandler)
  );
}

getPurchaseOrderById(id): Observable<PurchaseOrder> {
  return this.httpClient.get<PurchaseOrder>(environment.apiUrl + '/purchaseOrders/' + id)
  .pipe(
    catchError(this.errorHandler)
  );
}

createPurchaseOrder(purchaseOrder): Observable<PurchaseOrder> {
  return this.httpClient.post<PurchaseOrder>(environment.apiUrl + '/purchaseOrders/', JSON.stringify(purchaseOrder), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  );
}

updatePurchaseOrder(id, purchaseOrder): Observable<PurchaseOrder> {
  // tslint:disable-next-line:max-line-length
  return this.httpClient.put<PurchaseOrder>(environment.apiUrl + '/purchaseOrders/' + id, JSON.stringify(purchaseOrder), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  );
}

deletePurchaseOrder(id) {
  return this.httpClient.delete<PurchaseOrder>(environment.apiUrl + '/purchaseOrders/' + id)
  .pipe(
    catchError(this.errorHandler)
  );
}

createUpdatePurchaseOrderItems(id, bundle): Observable<ProductBundle[]> {
  console.log(JSON.stringify(bundle));
  return this.httpClient.post<ProductBundle[]>(environment.apiUrl + '/purchaseOrderItems/bulk/' + id, JSON.stringify(bundle), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  );
}

errorHandler(error) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
  }
}


