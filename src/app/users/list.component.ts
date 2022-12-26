import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { DatePipe } from '@angular/common';

@Component({ 
    templateUrl: 'list.component.html',
    providers: [DatePipe] })
export class ListComponent implements OnInit {
    users = null;

    constructor(private accountService: AccountService,
        private alertService: AlertService) {}

    ngOnInit() {
      this.getUserList(); 
    }

    getUserList() {
        this.accountService.getAll()
        .pipe(first())
        .subscribe(users => {
            this.users = users.filter(el => el['timeoffRequest'] && el['timeoffRequest'].length > 1);
            if(!this.users.length) {
                this.alertService.success('There is no active time off request found.', { keepAfterRouteChange: true, autoClose: true});
            }
            
        },
        err => {
            this.users = [];
            this.alertService.info(err);
        });
    }

    deleteUser(arrovedList) {
        const user = this.users.find(x => x.id === arrovedList.id);
        user.isDeleting = true;
        // this.accountService.delete(arrovedList.id)
        //     .pipe(first())
        //     .subscribe(() => this.users = this.users.filter(x => x.id !== arrovedList.id));

            this.accountService.update(arrovedList.id, { timeoffRequest: [], numberOfdays: 0, approvedList: arrovedList.timeoffRequest})
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Approved successfully.', { keepAfterRouteChange: true, autoClose: true });
                    this.getUserList();
                    user.isDeleting = false;
                },
                error: error => {
                    this.alertService.error(error);
                    // this.loading = false;
                }
            });
    }
    
}