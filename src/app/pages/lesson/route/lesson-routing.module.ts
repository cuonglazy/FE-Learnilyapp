import { LessonComponent } from './../list/lesson.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateLessonComponent } from '../update/update.lesson.component';
import { LessonDetailComponent } from '../detail/lesson-detail.component';

const routes: Routes = [
  {
    path: "",
    component: LessonComponent,
  },
  {
    path: "new",
    component: UpdateLessonComponent,
  },
  {
    path: ":id/edit",
    component: UpdateLessonComponent,
  },
  {
    path: ":id/view",
    component: LessonDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }
