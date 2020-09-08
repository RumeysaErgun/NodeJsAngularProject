import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;


  constructor(private router: Router) {

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
            this.keepAfterNavigationChange = false;
        }
        else {
          // clear alert
          this.subject.next();
        }
      }
    });
   }

   success(message: string, keepAfterNavigationChange = false): any {
      this.keepAfterNavigationChange = keepAfterNavigationChange;
      this.subject.next({type: 'success', text: message});
   }

   error(message: string, keepAfterNavigationChange = false): any {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
  }

  warning(message: string, keepAfterNavigationChange = false): any {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'warning', text: message });
  }

  info(message: string, keepAfterNavigationChange = false): any {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'info', text: message });
  }

  clearAlertMessage(): any {
    this.subject.next();
  }
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
