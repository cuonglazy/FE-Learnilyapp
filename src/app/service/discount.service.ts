import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Discount, IDiscount, IDiscountCourse, getDiscountIdentifier } from "../pages/discount/discount.model";


export type EntityResponseType = HttpResponse<IDiscount>;
export type EntityResponseType1 = HttpResponse<IDiscountCourse>;
export type EntityArrayResponseType = HttpResponse<IDiscount[]>;

@Injectable({
    providedIn: 'root'
})
export class DiscountService {
    protected apiDiscount = `http://localhost:8080/api/v1/discounts`;
    protected apiPostDiscountCS = `http://localhost:8080/api/v1/discount-course`;
    protected token = `eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTcwNDgxMDE0Mn0.Poe0DZ8Fdn76crNwXsvqj5vsISwjpAMsfO0IAu7mNNI`;
    constructor(protected http: HttpClient) { }

      create(discount: IDiscount): Observable<EntityResponseType>{
        const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
        const options = {
          headers: headers,
          observe: 'response' as 'response'
        }
        return this.http.post<IDiscount>(this.apiDiscount, discount, options); 
      }

      insertProduct(discount: Discount): Observable<any> {
        return this.http.post(this.apiDiscount, discount);
      }
    
      createDiscountCourse(discountCourse: IDiscountCourse): Observable<EntityResponseType1>{
        return this.http.post<IDiscountCourse>(this.apiPostDiscountCS,discountCourse, {observe: 'response'});
      }
    
      update(discount: IDiscount): Observable<EntityResponseType>{
        const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
        const options = {
          headers: headers,
          observe: 'response' as 'response'
        }

        return this.http.put<IDiscount>(`${this.apiDiscount}/${getDiscountIdentifier(discount) as number}`,discount , options);
      }
    
      delete(id: number): Observable<HttpResponse<{}>> {
        const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
        const options = {
          headers: headers,
          observe: 'response' as 'response'
        }

        return this.http.delete<any>(`${this.apiDiscount}/${id}`, options);
      }

      deleteDiscountCourse(id: number): Observable<HttpResponse<{}>> {
        const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
        const options = {
          headers: headers,
          observe: 'response' as 'response'
        }
        return this.http.delete<any>(`${this.apiPostDiscountCS}/${id}`, options)
      }
    
      findAll(): Observable<EntityArrayResponseType> {
        const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
        
        const options = {
          headers: headers,
          observe: 'response' as 'response'
        }
    
        return this.http.get<IDiscount[]>(this.apiDiscount, options);
      }
      
      findOne(id: number): Observable<EntityResponseType> {
        const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
        
        const options = {
          headers: headers,
          observe: 'response' as 'response'
        }
        return this.http.get<IDiscount>(`${this.apiDiscount}/${id}`,options);
      }
    
      findCode(code: string): Observable<EntityResponseType> {
        return this.http.get<IDiscount>(`${this.apiDiscount}/code/${code}`,{observe: 'response'})
      }
    
      findPages(page:any,size:any): Observable<EntityArrayResponseType> {
        const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
        const options = {
          headers: headers,
          observe: 'response' as 'response'
        } 
        return this.http.get<IDiscount[]>(`${this.apiDiscount}/pages?page=${page}&size=${size}`,options);
      }
}