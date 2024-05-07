import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  login(credentials: { username: string, password: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      
      this.http.post<any>('URL_DE_LOGIN', credentials).subscribe(
        (response: any) => {
          resolve(response);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  getData(): Observable<any> {
    return this.http.get<any>('URL_DE_API');
  }

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('userToken');
    if (!isLoggedIn) {
      this.router.navigate(['/login']); 
      return false;
    }
    return true;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
