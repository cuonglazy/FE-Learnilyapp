import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserResponse } from 'src/app/responses/users/user.response';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { UpdateUserDTO } from 'src/app/dtos/user/update.user.dto';

@Component({
  selector: 'app-update.user-profile',
  templateUrl: './update.user-profile.component.html',
})
export class UpdateUserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  userResponse?: UserResponse | null;
  token:string = '';

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private formBuider: FormBuilder,
    private activedRoute: ActivatedRoute
  ) {
    this.userProfileForm = this.formBuider.group({
      fullname: [''],
      phone_number: ['', Validators.minLength(10)],
      date_of_birth: [Date.now()],
      password: ['', [Validators.minLength(6)]],
      retypePassword: ['', [Validators.minLength(6)]],
      address: ['']
    })
  }

  ngOnInit(): void {
    debugger
    let token: string = this.tokenService.getToken() ?? ''
    this.userService.getUserDetails(token).subscribe({
      next: (response: any) => {
        debugger
        this.userResponse = {
          ...response,
          date_of_birth: new Date(response.date_of_birth),
        };
        this.userProfileForm.patchValue({
          fullname: this.userResponse?.fullname ?? '',
          phone_number: this.userResponse?.phone_number ?? '',
          address: this.userResponse?.address ?? '',
          date_of_birth: this.userResponse?.date_of_birth.toISOString().substring(0, 10),
        })
        this.userService.saveUserResponseToLocalStorage(this.userResponse);
        // this.router.navigate(['/system-admin/dashboard']);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        alert(error.error.message);
      }
    })
  }                

  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const retypedPassword = formGroup.get('retype_password')?.value;
      if (password !== retypedPassword) {
        return { passwordMismatch: true };
      }
  
      return null;
    };
  }

  save(): void {
    debugger
    if (this.userProfileForm.valid) {
      const updateUserDTO: UpdateUserDTO = {
        fullname: this.userProfileForm.get('fullname')?.value,
        address: this.userProfileForm.get('address')?.value,
        password: this.userProfileForm.get('password')?.value,
        phone_number: this.userProfileForm.get('phone_number')?.value,
        retype_password: this.userProfileForm.get('retype_password')?.value,
        date_of_birth: this.userProfileForm.get('date_of_birth')?.value
      };
  
      this.userService.updateUserDetail(this.token, updateUserDTO)
        .subscribe({
          next: (response: any) => {
            this.userService.removeUserFromLocalStorage();
            this.tokenService.removeToken();
            this.router.navigate(['/login']);
          },
          error: (error: any) => {
            alert(error.error.message);
          }
        });
    } else {
      if (this.userProfileForm.hasError('passwordMismatch')) {        
        alert('Mật khẩu và mật khẩu gõ lại chưa chính xác')
      }
    }
  }    
}
