import { Component, OnInit } from '@angular/core';
import { Lesson } from '../lesson.model';
import { LessonService } from 'src/app/service/lesson.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
})
export class LessonComponent implements OnInit {

  lessons: Lesson[] = [];
  totalItems: number;
  itemsPerPage: number = 10;
  page: number = 1;
  displayPage: number = 1;
  totalPages: number;
  searchForm: FormGroup;

  constructor(protected lessonService: LessonService, protected formBuilder: FormBuilder) { 
    this.searchForm = this.formBuilder.group({
      keyword: [""],
      page: [0],
      size: [10],
    })
  }

  ngOnInit(): void {
    this.loadPage();
  }
  
  async searchAllPages(): Promise<void> {
    let page = 0;
    let totalPages = 1;

    while (page < totalPages) {
      this.searchForm.patchValue({ page: page });
      await this.loadPage();
      page++;
    }
  }

  loadPage(): Promise<void> {
    return new Promise<void>((resolve) => {
      const formValue = this.searchForm.value;
      this.lessonService.findAllPages(formValue).pipe(
        map((res: HttpResponse<any>) => {
          this.totalItems = Number(res.headers.get('X-Total-Count'));
          this.page = formValue.page;
          if (res.body) {
            this.totalPages = res.body['totalPages'];
            this.lessons = res.body['lessons'] ? res.body['lessons'] : [];
          }
          resolve();
          return null;
        })
      ).subscribe();
    });
  }
  
  getPageArray(): number[] {
    const pages = [];
    for (let i = 0; i < 3; i++) {
      const page = this.displayPage + i;
      if (page <= this.totalPages) {
        pages.push(page);
      }
    }
    return pages;
  }
  
  navigateToPage(newPage: number): void {
    let pageToRequest = newPage;
    if (newPage === 1 && this.displayPage > 0) {
      pageToRequest = 0;
    }
  
    this.searchForm.patchValue({ page: pageToRequest });
    this.displayPage = pageToRequest;
    this.loadPage();
  }  

  


}
