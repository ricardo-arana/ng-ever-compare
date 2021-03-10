import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CheckForUpdateService {

  constructor(private appRef: ApplicationRef,private updates: SwUpdate) { 
     // Allow the app to stabilize first, before starting polling for updates with `interval()`.
     console.log('check updates active');
     const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
     const everyHour$ = interval( 60 * 60 * 1000);
     const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everyHour$);
 
     everySixHoursOnceAppIsStable$.subscribe(() => updates.checkForUpdate());

     this.updateEnables();
  }


  updateEnables() {
    this.updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      if(confirm('Hay una nueva versión de la aplicación, desea actualizar?')){
        this.updates.activateUpdate().then(() => document.location.reload());
      }
    });
    this.updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }

}
